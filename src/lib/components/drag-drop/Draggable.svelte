<script>
  import { toStateClasses } from '$lib/util/design-system/index.js';
  import { createOrGetDragState } from './drag-state.svelte.js';
  import { DragController } from './DragController.js';
  import { generateLocalId } from '$lib/util/unique';
  import { onDestroy } from 'svelte';
  import {
    IDLE,
    DRAGGING,
    DRAG_PREVIEW,
    DROPPING,
    DRAG_DISABLED
  } from '$lib/constants/state-labels/drag-states.js';


  /** @typedef {import('$lib/typedef').SimulatedDragEvent} SimulatedDragEvent */

  /**
   * @type {{
   *   item: any,
   *   group?: string,
   *   source?: string,
   *   disabled?: boolean,
   *   dragDelay?: number,
   *   base?: string,
   *   classes?: string,
   *   children: import('svelte').Snippet,
   *   draggingSnippet?: import('svelte').Snippet<[{
   *     element: HTMLElement,
   *     rect: DOMRect
   *   }]>,
   *   contextKey?: import('$lib/typedef').ContextKey,
   *   isDragging?: boolean,
   *   isDropping?: boolean,
   *   isDragPreview?: boolean,
   *   onDragStart?: (detail: {
   *     event: DragEvent,
   *     item: any,
   *     source: string,
   *     group: string,
   *     getController: () => DragController
   *   }) => void,
   *   onDragging?: (detail: {
   *     event: DragEvent,
   *     item: any
   *   }) => void,
   *   onDragEnd?: (detail: {
   *     event: DragEvent,
   *     item: any,
   *     wasDropped: boolean
   *   }) => void,
   *   onDrop?: (detail: {
   *     event: DragEvent,
   *     item: any,
   *     wasDropped: boolean
   *   }) => void,
   *   canDrag?: (item: any) => boolean,
   *   [key: string]: any
   * }}
   */
  let {
    item,
    group = 'default',
    source = 'default',
    disabled = false,
    dragDelay = 0,
    base = '',
    classes = '',
    children,
    draggingSnippet,
    contextKey,
    isDragging = $bindable(false),
    isDropping = $bindable(false),
    isDragPreview = $bindable(false),
    onDragStart,
    onDragging,
    onDragEnd,
    onDrop,
    canDrag = () => true,
    ...attrs
  } = $props();

  const dragState = createOrGetDragState(contextKey);

  const draggableId = generateLocalId();

  // svelte-ignore non_reactive_update
  let draggableElement;

  let dragTimeout = null;
  let currentState = $state(IDLE);

  // Custom preview follower state
  let showPreview = $state(false);
  let previewX = $state(0);
  let previewY = $state(0);
  let dragOffsetX = $state(0);
  let dragOffsetY = $state(0);
  let customPreviewSet = $state(false);
  let elementRect = $state(null);

  // Computed state object for CSS classes
  let stateObject = $derived({
    idle: currentState === IDLE,
    dragging: currentState === DRAGGING,
    'drag-preview': currentState === DRAG_PREVIEW,
    dropping: currentState === DROPPING,
    'drag-disabled': disabled || !canDrag(item)
  });

  let stateClasses = $derived(toStateClasses(stateObject));

  // Update bindable props
  $effect(() => {
    isDragging = currentState === DRAGGING;
    isDropping = currentState === DROPPING;
    isDragPreview = currentState === DRAG_PREVIEW;
  });

  // Clean up on component destroy
  onDestroy(() => {
    if (showPreview) {
      document.removeEventListener('dragover', handleDocumentDragOver);
    }
  });

  /**
   * Handle document level dragover to ensure we get position updates
   * @param {DragEvent} event
   */
  function handleDocumentDragOver(event) {
    if (showPreview && currentState === DRAGGING) {
      // Update position for the custom preview
      previewX = event.clientX - dragOffsetX;
      previewY = event.clientY - dragOffsetY;

      // Prevent default to allow drop
      event.preventDefault();
    }
  }

  /**
   * Handle drag start
   * @param {DragEvent} event
   */
  function handleDragStart(event) {
    if (disabled || !canDrag(item)) {
      event.preventDefault();
      return;
    }

    // Handle drag delay
    if (dragDelay > 0) {
      event.preventDefault();
      currentState = DRAG_PREVIEW;

      dragTimeout = setTimeout(() => {
        currentState = DRAGGING;
        startDrag(event);
      }, dragDelay);
      return;
    }

    currentState = DRAGGING;
    startDrag(event);
  }

  /**
   * Start the drag operation
   * @param {DragEvent} event - The drag event
   */
  function startDrag(event) {
    // Get the element's bounding rectangle
    const rect = draggableElement.getBoundingClientRect();

    // Calculate grab offsets - this is where the user grabbed the element
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;

    // Create drag data with draggableId included
    const dragData = {
      draggableId,
      offsetX: dragOffsetX,
      offsetY: dragOffsetY,
      item,
      source,
      group
    };

    // Set shared drag state
    dragState.start(draggableId, dragData);

    // Set minimal data transfer for browser drag and drop API
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(
      'application/json',
      JSON.stringify({ draggableId })
    );

    // Create the preview controller
    const previewController = new DragController(event);

    // Function to get the preview controller
    const getController = () => previewController;

    // Call onDragStart with the getController function
    onDragStart?.({ event, item, source, group, getController });

    // Apply drag preview if available
    if (draggingSnippet && !previewController.hasCustomPreview()) {
      try {
        // Store rectangle information for the snippet
        elementRect = rect;

        // These offsets represent where the user grabbed the element relative to its top-left corner
        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;

        // Set initial position - this places the preview at the element's original position
        previewX = rect.left;
        previewY = rect.top;

        // Set a transparent 1x1 pixel image to hide browser's default preview
        const emptyImg = new Image();
        emptyImg.src =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        event.dataTransfer.setDragImage(emptyImg, 0, 0);

        // Add document level event listener to track mouse movement
        document.addEventListener('dragover', handleDocumentDragOver);

        // Show custom preview
        showPreview = true;
        customPreviewSet = true;
      } catch (err) {
        console.error('Error setting up custom preview:', err);
        // Fallback to default preview
        previewController.applyDefaultPreview();
      }
    } else if (!previewController.hasCustomPreview()) {
      // Apply default preview if no custom preview was set
      previewController.applyDefaultPreview();
    }
  }

  /**
   * Handle during drag
   * @param {DragEvent} event
   */
  function handleDrag(event) {
    if (currentState === DRAGGING) {
      onDragging?.({ event, item });
    }
  }

  /**
   * Handle drag end
   * @param {DragEvent} event
   */
  function handleDragEnd(event) {
    clearTimeout(dragTimeout);

    // Clear global drag state
    dragState.end(draggableId);

    // Clean up document event listener
    if (customPreviewSet) {
      document.removeEventListener('dragover', handleDocumentDragOver);
      showPreview = false;
      customPreviewSet = false;
      elementRect = null;
    }

    // Check if drop was successful
    const wasDropped = event.dataTransfer.dropEffect !== 'none';

    if (wasDropped) {
      currentState = DROPPING;
      onDrop?.({ event, item, wasDropped: true });

      // Brief dropping state before returning to idle
      setTimeout(() => {
        currentState = IDLE;
      }, 100);
    } else {
      currentState = IDLE;
    }

    onDragEnd?.({ event, item, wasDropped });
  }

  /**
   * Handle mouse down for drag delay
   * @param {MouseEvent} event
   */
  function handleMouseDown(event) {
    if (dragDelay > 0 && !disabled && canDrag(item)) {
      // Could add visual feedback here
    }
  }

  /**
   * Handle mouse up to cancel drag delay
   * @param {MouseEvent} event
   */
  function handleMouseUp(event) {
    if (dragTimeout) {
      clearTimeout(dragTimeout);
      currentState = IDLE;
    }
  }

  // Add these variables for touch handling
  let touchDragging = $state(false);
  let touchStartX = 0;
  let touchStartY = 0;
  let touchPreviewElement = null;

  /**
   * Handle touch start
   * @param {TouchEvent} event
   */
  function handleTouchStart(event) {
    if (disabled || !canDrag(item)) return;

    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

    // Start drag after a small delay to distinguish from scrolling
    dragTimeout = setTimeout(() => {
      touchDragging = true;
      currentState = DRAGGING;

      // Create drag data
      const rect = draggableElement.getBoundingClientRect();
      dragOffsetX = touch.clientX - rect.left;
      dragOffsetY = touch.clientY - rect.top;

      const dragData = {
        draggableId,
        offsetX: dragOffsetX,
        offsetY: dragOffsetY,
        item,
        source,
        group
      };

      dragState.start(draggableId, dragData);

      // Show preview
      if (draggingSnippet) {
        elementRect = rect;
        previewX = rect.left;
        previewY = rect.top;
        showPreview = true;
      }

      // Prevent scrolling while dragging
      event.preventDefault();

      // Add document-level touch handlers
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false
      });
      document.addEventListener('touchend', handleTouchEnd);
    }, 150); // 150ms delay to distinguish from scrolling
  }

  /**
   * Handle touch move
   * @param {TouchEvent} event
   */
function handleTouchMove(event) {
  if (!touchDragging) return;

  event.preventDefault();
  const touch = event.touches[0];

  // Update preview position
  if (showPreview) {
    previewX = touch.clientX - dragOffsetX;
    previewY = touch.clientY - dragOffsetY;
  }

  /** @type {SimulatedDragEvent} */
  const simulatedEvent = {
    type: 'dragover',
    clientX: touch.clientX,
    clientY: touch.clientY,
    dataTransfer: {
      types: ['application/json'],
      getData: () => JSON.stringify({ draggableId }),
      dropEffect: 'move',
      effectAllowed: 'move',
      files: []
    },
    preventDefault: () => {},
    stopPropagation: () => {}
  };

  // Update active dropzone in drag state
  dragState.updateActiveDropZone(touch.clientX, touch.clientY, simulatedEvent);
}

  /**
   * Handle touch end
   * @param {TouchEvent} event
   */
  function handleTouchEnd(event) {
  clearTimeout(dragTimeout);

  if (!touchDragging) return;

  const touch = event.changedTouches[0];

  /** @type {SimulatedDragEvent} */
  const simulatedEvent = {
    type: 'drop',
    clientX: touch.clientX,
    clientY: touch.clientY,
    dataTransfer: {
      types: ['application/json'],
      getData: () => JSON.stringify({ draggableId }),
      dropEffect: 'move',
      effectAllowed: 'move',
      files: []
    },
    preventDefault: () => {},  // Add this!
    stopPropagation: () => {}  // And this!
  };

  // Trigger drop at final touch position
  dragState.handleDropAtPoint(touch.clientX, touch.clientY, simulatedEvent);

  // Clean up
  touchDragging = false;
  currentState = IDLE;
  showPreview = false;
  dragState.end(draggableId);

  // Remove document handlers
  document.removeEventListener('touchmove', handleTouchMove);
  document.removeEventListener('touchend', handleTouchEnd);
}
</script>

<div
  data-component="draggable"
  bind:this={draggableElement}
  draggable={!disabled && canDrag(item)}
  ondragstart={handleDragStart}
  ondrag={handleDrag}
  ondragend={handleDragEnd}
  onmousedown={handleMouseDown}
  onmouseup={handleMouseUp}
  ontouchstart={handleTouchStart}
  class="{base} {classes} {stateClasses}"
  style="touch-action: none;"
  {...attrs}
>
  {@render children()}
</div>

{#if draggingSnippet && showPreview && elementRect}
  <div
    data-companion="drag-preview-follower"
    style="position: fixed; z-index: 9999; pointer-events: none;"
    style:left="{previewX}px"
    style:top="{previewY}px"
  >
    {@render draggingSnippet({ element: draggableElement, rect: elementRect })}
  </div>
{/if}

<style>
  [data-component='draggable'] {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }
</style>
