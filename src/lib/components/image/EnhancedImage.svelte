<script>
  import { onMount } from 'svelte';

  /**
   * @example
   * import { EnhancedImage }
   *   from '$lib/components/EnhancedImage/index.js';
   *
   * <EnhancedImage
   *   classes="aspect-video max-h-svh w-full border-8 border-pink-500"
   *   src={NeonLightsOff}
   *   onload={() => {
   *     console.log('loaded');
   *   }}
   * />
   */

  /**
   * @type {{
   *   base?: string,
   *   bg?: string,
   *   classes?: string,
   *   overflow?: string,
   *   aspect?: string,
   *   fit?: string,
   *   position?: string,
   *   src: string | import('$lib/typedef/image.js').Picture,
   *   alt?: string,
   *   onload?: ( e: (Event|{ type: string, target: HTMLImageElement }) ) => void,
   *   onerror?: ( e: (Event|{ type: string, target: HTMLImageElement }) ) => void,
   *   loading?: string
   * } & { [attr: string]: * }}
   */
  let {
    // Style
    base,
    bg,
    classes,

    overflow = 'overflow-clip',
    aspect,

    fit = 'contain',
    position = 'left top',

    src,
    alt = '',
    onload,
    onerror,
    loading,

    // Attributes
    ...attrs
  } = $props();

  // let show = $state(false);

  /** @type {HTMLDivElement|undefined} */
  let imgBoxElem = $state();

  /** @type {HTMLImageElement|undefined} */
  let imgElem = $state();

  /** @type {string | import('$lib/typedef/image.js').Picture} */
  let src_;

  $effect(() => {
    if (src_ && src !== src_) {
      throw new Error('Property [src] change is not supported');
    }
  });

  let aspectStyle = $state('');

  // > Event names
  const LOAD = 'load';
  const ERROR = 'error';

  // > onMount

  onMount(() => {
    // show = true;

    imgElem = imgBoxElem?.getElementsByTagName('img')[0];

    if (!imgElem) {
      throw new Error('Missing IMG element');
    }

    // > Auto set box aspect to same as image aspect if not set

    if (!aspect) {
      aspectStyle = `${imgElem.width / imgElem.height}`;
    } else {
      aspectStyle = '';
    }

    // > Register image onload and onerror handlers

    /** @type {( e: Event ) => void} */
    let onloadFn;

    if (onload) {
      if (imgElem?.complete) {
        onload({ type: LOAD, target: imgElem });
      } else {
        onloadFn = onload;
        imgElem?.addEventListener(LOAD, onloadFn);
      }
    }

    /** @type {( e: Event ) => void} */
    let onerrorFn;

    if (onerror) {
      onerrorFn = onerror;
      imgElem?.addEventListener(ERROR, onerrorFn);
    }

    return () => {
      if (onloadFn) {
        imgElem?.removeEventListener(LOAD, onloadFn);
      }

      if (onerrorFn) {
        imgElem?.removeEventListener(ERROR, onerrorFn);
      }
    };
  });
</script>

<div
  data-hk-enhanced-image
  bind:this={imgBoxElem}
  class="{base} {bg} {aspect} {overflow} {classes}"
  style:--fit={fit}
  style:--pos={position}
  style:aspect-ratio={aspectStyle}
  {...attrs}
>
  <enhanced:img {src} {alt} />
</div>

<style>
  [data-hk-enhanced-image],
  :global([data-hk-enhanced-image] picture),
  :global([data-hk-enhanced-image] img) {
    display: block;
    width: 100%;
    height: 100%;
  }
  :global([data-hk-enhanced-image] picture),
  :global([data-hk-enhanced-image] img) {
    max-width: 100%;
    max-height: 100%;
  }

  :global([data-hk-enhanced-image] img) {
    object-fit: var(--fit);
    object-position: var(--pos);
  }
</style>
