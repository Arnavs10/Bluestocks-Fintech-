// js/manage-ipo.js

document.addEventListener('DOMContentLoaded', function() {
    // Ensure Supabase is available
    if (!window.supabaseClient) {
        console.error('Supabase client is not initialized.');
        alert('A critical error occurred. Please try reloading the page.');
        return;
    }
    const supabase = window.supabaseClient;

    // Get DOM elements
    const tableBody = document.getElementById('ipo-table-body');
    const registerIpoBtn = document.querySelector('.register-ipo-btn');
    const modal = document.getElementById('ipo-modal');
    const modalTitle = document.getElementById('modal-title');
    const closeButton = document.querySelector('.modal .close-button');
    const ipoForm = document.getElementById('ipo-form');
    const ipoIdField = document.getElementById('ipo-id');
    const paginationContainer = document.querySelector('.pagination');

    const itemsPerPage = 10;
    let currentPage = 1;

    // Using local JavaScript data instead of Supabase
    let ipoData = [
        { id: 1, company_name: 'Adani Power', price_band: '₹ 329 - 136', open_date: '2023-06-03', close_date: '2024-06-05', issue_size: '45530.15 Cr.', issue_type: 'Book Built', listing_date: '2023-06-10', status: 'Ongoing' },
        { id: 2, company_name: 'VBL LTD', price_band: '₹ 229 - 136', open_date: '2024-06-03', close_date: '2024-06-05', issue_size: '1330.15 Cr.', issue_type: 'Book Built', listing_date: '2018-06-10', status: 'Coming' },
        { id: 3, company_name: 'Tata Motor', price_band: '₹ 12549 - 136', open_date: '2024-06-03', close_date: '2024-06-05', issue_size: '1340.15 Cr.', issue_type: 'Book Built', listing_date: '2016-06-10', status: 'New Listed' },
        { id: 4, company_name: 'HDFC LTD', price_band: '₹ 1244 - 136', open_date: '2024-06-03', close_date: '2024-06-05', issue_size: '830.15 Cr.', issue_type: 'Book Built', listing_date: '2029-06-11', status: 'Coming' },
        { id: 5, company_name: 'Tata Motor', price_band: '₹ 629 - 136', open_date: '2024-06-01', close_date: '2024-06-05', issue_size: '820.15 Cr.', issue_type: 'Book Built', listing_date: '2023-06-10', status: 'Ongoing' },
        { id: 6, company_name: 'VBL LTD', price_band: '₹ 629 - 136', open_date: '2024-06-03', close_date: '2024-06-05', issue_size: '130.15 Cr.', issue_type: 'Book Built', listing_date: '2024-06-10', status: 'Coming' },
        { id: 7, company_name: 'Tata Motor', price_band: '₹ 6729 - 136', open_date: '2024-06-03', close_date: '2024-06-05', issue_size: '170.15 Cr.', issue_type: 'Book Built', listing_date: '2027-06-10', status: 'New Listed' },
        { id: 8, company_name: 'VBL LTD', price_band: '₹ 1629 - 136', open_date: '2024-06-03', close_date: '2024-06-05', issue_size: '130.15 Cr.', issue_type: 'Book Built', listing_date: '2022-06-10', status: 'Coming' },
        { id: 9, company_name: 'Tata Motor', price_band: '₹ 2329 - 136', open_date: '2024-06-03', close_date: '2024-06-05', issue_size: '130.15 Cr.', issue_type: 'Book Built', listing_date: '2023-06-10', status: 'New Listed' },
        { id: 10, company_name: 'VBL LTD', price_band: '₹ 329 - 136', open_date: '2024-06-03', close_date: '2024-06-05', issue_size: '130.15 Cr.', issue_type: 'Book Built', listing_date: '2021-06-10', status: 'Coming' }
    ];

    // --- Utility Functions ---
    function getStatusClass(status) {
        if (!status) return '';
        return status.toLowerCase().replace(/\s+/g, '-');
    }

    // --- Rendering Functions ---
    function renderTable(page) {
        if (!tableBody) return;
        tableBody.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = ipoData.slice(start, end);

        if (paginatedItems.length === 0 && page === 1) {
            tableBody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:20px;">No IPOs found. Click 'Register IPO' to add one.</td></tr>`;
            return;
        }

        paginatedItems.forEach(ipo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ipo.company_name || ''}</td>
                <td>${ipo.price_band || ''}</td>
                <td>${ipo.open_date || ''}</td>
                <td>${ipo.close_date || ''}</td>
                <td>${ipo.issue_size || ''}</td>
                <td>${ipo.issue_type || ''}</td>
                <td>${ipo.listing_date || ''}</td>
                <td><span class="status ${getStatusClass(ipo.status)}">${ipo.status || ''}</span></td>
                <td><button class="action-btn update-btn" data-id="${ipo.id}">Update</button></td>
                <td>
                    <button class="icon-btn delete-btn" data-id="${ipo.id}" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                    <button class="icon-btn view-btn" data-id="${ipo.id}" title="View"><i class="fa-solid fa-eye"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function setupPagination() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(ipoData.length / itemsPerPage);

        if (pageCount <= 1) return;

        const createButton = (text, pageNum, isDisabled = false, isActive = false) => {
            const button = document.createElement('button');
            button.innerHTML = text;
            button.disabled = isDisabled;
            if (isActive) button.classList.add('active');
            button.addEventListener('click', () => {
                currentPage = pageNum;
                renderTable(currentPage);
                setupPagination();
            });
            return button;
        };

        paginationContainer.appendChild(createButton('&lt;', currentPage - 1, currentPage === 1));

        for (let i = 1; i <= pageCount; i++) {
            paginationContainer.appendChild(createButton(i, i, false, i === currentPage));
        }

        paginationContainer.appendChild(createButton('&gt;', currentPage + 1, currentPage === pageCount));
    }

    // --- Data Functions (Local) ---
    function fetchIpos() {
        console.log("Loading local IPO data...");
        // Data is already in ipoData array, just need to render it.
        currentPage = 1; // Reset to first page
        renderTable(currentPage);
        setupPagination();
    }

    // --- Modal Handling ---
    function openModalForCreate() {
        modalTitle.textContent = 'Register IPO';
        ipoForm.reset();
        ipoIdField.value = '';
        modal.style.display = 'block';
    }

    function openModalForUpdate(id) {
        const ipo = ipoData.find(i => i.id == id);
        if (!ipo) {
            alert('Could not find the selected IPO.');
            return;
        }
        
        modalTitle.textContent = 'Update IPO';
        ipoIdField.value = ipo.id;
        document.getElementById('company-name').value = ipo.company_name;
        document.getElementById('price-band').value = ipo.price_band;
        document.getElementById('open-date').value = ipo.open_date;
        document.getElementById('close-date').value = ipo.close_date;
        document.getElementById('issue-size').value = ipo.issue_size;
        document.getElementById('issue-type').value = ipo.issue_type;
        document.getElementById('listing-date').value = ipo.listing_date;
        document.getElementById('status').value = ipo.status;
        modal.style.display = 'block';
    }

    function closeModal() {
        if (modal) modal.style.display = 'none';
    }

    // --- Event Handlers ---
    function handleFormSubmit(e) {
        e.preventDefault();
        const formData = {
            company_name: document.getElementById('company-name').value,
            price_band: document.getElementById('price-band').value,
            open_date: document.getElementById('open-date').value,
            close_date: document.getElementById('close-date').value,
            issue_size: document.getElementById('issue-size').value,
            issue_type: document.getElementById('issue-type').value,
            listing_date: document.getElementById('listing-date').value,
            status: document.getElementById('status').value,
        };
        const id = ipoIdField.value;

        if (id) {
            // Update existing IPO in the local array
            const index = ipoData.findIndex(i => i.id == id);
            if (index !== -1) {
                ipoData[index] = { ...ipoData[index], ...formData };
            }
        } else {
            // Add new IPO to the local array
            formData.id = new Date().getTime(); // Simple unique ID for demo purposes
            ipoData.unshift(formData); // Add to the beginning of the array
        }
        
        closeModal();
        fetchIpos(); // Refresh table
    }

    function deleteIpo(id) {
        if (!confirm('Are you sure you want to delete this IPO?')) {
            return;
        }
        
        // Remove IPO from the local array
        ipoData = ipoData.filter(i => i.id != id);
        fetchIpos(); // Refresh table
    }

    function viewIpo(id) {
        const ipo = ipoData.find(i => i.id == id);
        if (ipo) {
            alert(`Viewing IPO Details:\n\nCompany: ${ipo.company_name}\nStatus: ${ipo.status}\nPrice Band: ${ipo.price_band}\nIssue Size: ${ipo.issue_size}`);
        } else {
            alert('IPO details not found.');
        }
    }

    // --- Attach Event Listeners ---
    if (registerIpoBtn) registerIpoBtn.addEventListener('click', openModalForCreate);
    if (closeButton) closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) closeModal();
    });
    if (ipoForm) ipoForm.addEventListener('submit', handleFormSubmit);
    
    if (tableBody) {
        tableBody.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;

            const id = button.dataset.id;
            if (!id) return;

            if (button.classList.contains('update-btn')) openModalForUpdate(id);
            else if (button.classList.contains('delete-btn')) deleteIpo(id);
            else if (button.classList.contains('view-btn')) viewIpo(id);
        });
    }

    // --- Initial Load ---
    fetchIpos();
});
