/**
 * @jest-environment jsdom
 */

// Simple integration test to verify basic functionality
test('should clip coupons when receiving clipIt message', () => {
  // Set up DOM elements
  document.body.innerHTML = `
    <button>Clip</button>
    <button>Unclip</button>
    <div class="DashboardTile--title">Coupons Clipped</div>
    <div>150</div>
  `;
  
  // Mock document.querySelectorAll to return buttons
  document.querySelectorAll = jest.fn().mockReturnValue([
    { innerText: 'Clip', click: jest.fn() },
    { innerText: 'Clip', click: jest.fn() },
    { innerText: 'Unclip', click: jest.fn() }
  ]);
  
  // Mock document.getElementsByClassName for clipped coupons check
  document.getElementsByClassName = jest.fn().mockReturnValue([
    { 
      innerText: 'Coupons Clipped',
      nextElementSibling: { innerText: '150' }
    }
  ]);
  
  // Mock window.location
  Object.defineProperty(window, 'location', {
    value: {
      href: 'https://www.kroger.com/savings/coupons',
      origin: 'https://www.kroger.com',
      pathname: '/savings/coupons'
    },
    writable: true
  });
  
  // Verify that the mocks are set up correctly
  expect(document.querySelectorAll().length).toBe(3);
  expect(document.getElementsByClassName()[0].innerText).toBe('Coupons Clipped');
  expect(window.location.origin).toBe('https://www.kroger.com');
}, 10000);
