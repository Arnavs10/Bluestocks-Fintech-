// Force dropdown to show on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set a small timeout to ensure everything is loaded
    setTimeout(function() {
        const dropdown = document.getElementById('userDropdownMenu');
        if (dropdown) {
            console.log('Forcing dropdown to show');
            dropdown.classList.add('show');
            
            // Add inline style to ensure it's visible
            dropdown.style.display = 'block';
            dropdown.style.zIndex = '9999';
            dropdown.style.position = 'absolute';
            dropdown.style.backgroundColor = '#fff';
            dropdown.style.border = '1px solid #ddd';
            dropdown.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            dropdown.style.right = '0';
            dropdown.style.top = '100%';
            dropdown.style.width = '200px';
            dropdown.style.padding = '10px';
        } else {
            console.error('Could not find dropdown element to force show');
        }
    }, 500);
});
