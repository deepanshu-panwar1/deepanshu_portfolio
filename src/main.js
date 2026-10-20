import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas';
import './style.css';
const canvas = document.getElementById('rive-canvas');
const status = document.getElementById('status');
const hero = document.querySelector('.hero');
status.hidden = false;
function applyLayout(instance) {
  const width = hero.clientWidth;
  const height = hero.clientHeight;
  instance.layout = new Layout({
    fit: Fit.Cover,
    alignment: Alignment.Center,
    minX: 0,
    minY: 0,
    maxX: width,
    maxY: height,
  });
  instance.resizeToCanvas();
  instance.resizeDrawingSurfaceToCanvas();
}
const rive = new Rive({
  src: '/hero_ui_animation.riv',
  canvas,
  artboard: 'Artboard',
  stateMachine: 'State Machine 1',
  autoplay: true,
  autoBind: true,
  layout: new Layout({
    fit: Fit.Cover,
    alignment: Alignment.Center,
  }),
  onLoad: () => {
    status.hidden = true;
    applyLayout(rive);
  },
  onLoadError: (event) => {
    status.hidden = false;
    status.textContent =
      event?.message ||
      'Could not load the Rive animation. Check the browser console for details.';
  },
});
window.addEventListener('resize', () => applyLayout(rive));
window
  .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
  .addEventListener('change', () => applyLayout(rive));
new ResizeObserver(() => applyLayout(rive)).observe(hero);
