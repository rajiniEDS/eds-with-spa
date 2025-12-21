
/**
 * EDS Block: hero
 * Displays a simple "Hello from AngularJS!" using AngularJS (1.x).
 * AngularJS is lazy-loaded only when this block is present.
 */

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default async function decorate(block) {
  // 1) Lazy-load AngularJS (pinned version)
  await loadScript('https://cdn.jsdelivr.net/npm/angular@1.8.3/angular.min.js');

  // 2) Define an AngularJS module for this block
  const moduleName = 'heroModule';
  const angular = window.angular;

  // Create the module only once even if multiple hero blocks exist
  try {
    angular.module(moduleName);
  } catch {
    angular.module(moduleName, [])
      .controller('HeroCtrl', ['$scope', function ($scope) {
        $scope.message = 'Hello from AngularJS!';
      }]);
  }

  // 3) Build the container and template
  const container = document.createElement('div');
  container.className = 'hero-container';
  container.innerHTML = `
    <section class="hero">
      <div ng-controller="HeroCtrl" class="hero-content">
        <h1 class="hero-title">{{ message }}</h1>
      </div>
    </section>
  `;

  // Replace authored placeholder and mount AngularJS markup
  block.innerHTML = '';
  block.appendChild(container);

  // 4) Manually bootstrap AngularJS on this block root
   angular.bootstrap(block, [moduleName]);
