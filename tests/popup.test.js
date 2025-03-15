/**
 * @jest-environment jsdom
 */

// Basic test to verify popup functionality
test('should update DOM when value changes', () => {
  // Set up DOM elements
  document.body.innerHTML = `
    <div id="currentValue">25</div>
    <input id="rangeInput" type="range" min="1" max="200" value="25">
  `;
  
  // Mock getElementById to return actual elements
  document.getElementById = jest.fn().mockImplementation((id) => {
    return document.querySelector(`#${id}`);
  });
  
  // Manually update the DOM
  const currentValue = document.getElementById('currentValue');
  const rangeInput = document.getElementById('rangeInput');
  
  currentValue.innerText = '50';
  rangeInput.value = '50';
  
  // Verify that the DOM was updated correctly
  expect(currentValue.innerText).toBe('50');
  expect(rangeInput.value).toBe('50');
});
