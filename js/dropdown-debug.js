// Debug helper for the user dropdown
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Create debug controls
        const debugControls = document.createElement('div');
        debugControls.style.cssText = 'position: fixed; bottom: 10px; right: 10px; z-index: 9999; background: #fff; padding: 10px; border: 1px solid #ccc; border-radius: 5px;';
        
        // Create toggle button
        const toggleDropdownBtn = document.createElement('button');
        toggleDropdownBtn.textContent = 'Toggle Dropdown';
        toggleDropdownBtn.style.cssText = 'padding: 5px 10px; margin-right: 10px; cursor: pointer;';
        toggleDropdownBtn.addEventListener('click', function() {
            const dropdown = document.getElementById('userDropdownMenu');
            if (dropdown) {
                dropdown.classList.toggle('show');
                console.log('Dropdown toggled via debug button, now:', dropdown.classList.contains('show') ? 'showing' : 'hidden');
            } else {
                console.error('Dropdown element not found!');
            }
        });
        
        // Create debug info
        const debugInfo = document.createElement('div');
        debugInfo.style.cssText = 'margin-top: 10px; font-size: 12px;';
        
        // Check dropdown elements
        const toggles = document.querySelectorAll('.user-dropdown-toggle');
        const dropdown = document.getElementById('userDropdownMenu');
        
        debugInfo.innerHTML = `
            <div>Dropdown Toggles: ${toggles.length}</div>
            <div>Dropdown Menu: ${dropdown ? 'Found' : 'Not Found'}</div>
            <div>CSS Loaded: ${document.querySelector('link[href*="dropdown.css"]') ? 'Yes' : 'No'}</div>
        `;
        
        // Add elements to controls
        debugControls.appendChild(toggleDropdownBtn);
        debugControls.appendChild(debugInfo);
        
        // Add to document
        document.body.appendChild(debugControls);
        
        console.log('Dropdown debug controls added');
    });
})();
