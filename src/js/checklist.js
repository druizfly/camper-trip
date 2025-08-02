// Checklist functionality for the equipment page

document.addEventListener('DOMContentLoaded', function() {
    initChecklist();
    initChecklistSearch();
    initProgressTracker();
});

// Initialize checklist functionality
function initChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    // Load saved checklist state from localStorage
    loadChecklistState();
    
    // Add event listeners to all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            saveChecklistState();
            updateProgress();
            animateCheckbox(this);
        });
    });
    
    // Initial progress update
    updateProgress();
}

// Save checklist state to localStorage
function saveChecklistState() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const checklistState = {};
    
    checkboxes.forEach((checkbox, index) => {
        const label = checkbox.nextElementSibling;
        const itemText = label ? label.textContent.trim() : `item_${index}`;
        checklistState[itemText] = checkbox.checked;
    });
    
    localStorage.setItem('camperTripChecklist', JSON.stringify(checklistState));
}

// Load checklist state from localStorage
function loadChecklistState() {
    const savedState = localStorage.getItem('camperTripChecklist');
    
    if (savedState) {
        const checklistState = JSON.parse(savedState);
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        
        checkboxes.forEach((checkbox, index) => {
            const label = checkbox.nextElementSibling;
            const itemText = label ? label.textContent.trim() : `item_${index}`;
            
            if (checklistState.hasOwnProperty(itemText)) {
                checkbox.checked = checklistState[itemText];
                
                // Add visual state for checked items
                if (checkbox.checked) {
                    checkbox.closest('.checklist-item').classList.add('completed');
                }
            }
        });
    }
}

// Update progress indicator
function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const total = checkboxes.length;
    const completed = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    
    // Update progress bar if it exists
    const progressBar = document.getElementById('checklist-progress');
    const progressText = document.getElementById('progress-text');
    
    if (progressBar && progressText) {
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${completed}/${total} elementos completados (${percentage}%)`;
        
        // Change color based on completion
        if (percentage === 100) {
            progressBar.style.backgroundColor = '#27ae60';
        } else if (percentage >= 75) {
            progressBar.style.backgroundColor = '#f39c12';
        } else {
            progressBar.style.backgroundColor = '#3498db';
        }
    }
    
    // Update page title with progress
    if (completed > 0) {
        document.title = `Lista de Equipaje (${completed}/${total}) - Aventura en Camper`;
    }
}

// Animate checkbox when checked/unchecked
function animateCheckbox(checkbox) {
    const checklistItem = checkbox.closest('.checklist-item');
    
    if (checkbox.checked) {
        checklistItem.classList.add('completed');
        // Add a brief animation
        checklistItem.style.transform = 'scale(1.02)';
        setTimeout(() => {
            checklistItem.style.transform = 'scale(1)';
        }, 150);
    } else {
        checklistItem.classList.remove('completed');
    }
}

// Initialize progress tracker
function initProgressTracker() {
    // Create progress tracker if it doesn't exist
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !document.getElementById('progress-tracker')) {
        const progressTracker = document.createElement('div');
        progressTracker.id = 'progress-tracker';
        progressTracker.innerHTML = `
            <h3>Progreso</h3>
            <div class="progress-container">
                <div class="progress-bar">
                    <div id="checklist-progress" class="progress-fill"></div>
                </div>
                <p id="progress-text">0/0 elementos completados (0%)</p>
            </div>
            <div class="progress-actions">
                <button id="reset-checklist" class="btn btn-secondary">🔄 Reiniciar</button>
                <button id="export-checklist" class="btn btn-primary">📄 Exportar</button>
            </div>
        `;
        
        sidebar.appendChild(progressTracker);
        
        // Add event listeners for progress actions
        document.getElementById('reset-checklist').addEventListener('click', resetChecklist);
        document.getElementById('export-checklist').addEventListener('click', exportChecklist);
    }
}

// Reset all checklist items
function resetChecklist() {
    if (confirm('¿Está seguro de que desea reiniciar toda la lista? Se perderá el progreso actual.')) {
        const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest('.checklist-item').classList.remove('completed');
        });
        
        // Clear localStorage
        localStorage.removeItem('camperTripChecklist');
        
        // Update progress
        updateProgress();
        
        // Show success message
        showNotification('Lista reiniciada correctamente', 'success');
    }
}

// Export checklist to text format
function exportChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    let exportText = 'LISTA DE EQUIPAJE - AVENTURA EN CAMPER\n';
    exportText += '=====================================\n\n';
    
    // Group by sections
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const sectionTitle = section.querySelector('h2');
        if (sectionTitle) {
            exportText += `${sectionTitle.textContent}\n`;
            exportText += '-'.repeat(sectionTitle.textContent.length) + '\n';
            
            const sectionCheckboxes = section.querySelectorAll('.checklist-item input[type="checkbox"]');
            sectionCheckboxes.forEach(checkbox => {
                const label = checkbox.nextElementSibling;
                const status = checkbox.checked ? '[✓]' : '[ ]';
                const text = label ? label.textContent.trim() : '';
                exportText += `${status} ${text}\n`;
            });
            
            exportText += '\n';
        }
    });
    
    // Add timestamp
    exportText += `\nExportado el: ${new Date().toLocaleString('es-ES')}\n`;
    
    // Create and download file
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lista-equipaje-camper.txt';
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Lista exportada correctamente', 'success');
}

// Initialize search functionality for checklist
function initChecklistSearch() {
    const searchInput = document.getElementById('checklist-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            filterChecklistItems(query);
        });
    }
}

// Filter checklist items based on search
function filterChecklistItems(query) {
    const checklistItems = document.querySelectorAll('.checklist-item');
    
    checklistItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matches = text.includes(query);
        
        item.style.display = matches ? 'flex' : 'none';
        
        // Hide/show parent categories if all items are hidden
        const category = item.closest('.checklist-category');
        if (category) {
            const visibleItems = category.querySelectorAll('.checklist-item[style*="flex"]');
            const hasVisibleItems = query === '' || visibleItems.length > 0;
            category.style.display = hasVisibleItems ? 'block' : 'none';
        }
    });
}

// Show notification message
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveChecklistState,
        loadChecklistState,
        updateProgress,
        resetChecklist
    };
} 