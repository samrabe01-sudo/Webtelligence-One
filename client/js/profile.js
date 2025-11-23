// Profile Page JavaScript
// Handles user profile data, authentication, and interactions

document.addEventListener('DOMContentLoaded', () => {
    initProfile();
    initNavbarInteractions();
});

// Initialize profile page
async function initProfile() {
    // Check authentication
    const token = localStorage.getItem('user_token');
    const userInfo = localStorage.getItem('user_info');

    if (!token || !userInfo) {
        // Not logged in, redirect to home
        window.location.href = 'index.html';
        return;
    }

    try {
        const user = JSON.parse(userInfo);
        loadProfileData(user);
        setupEventListeners(user);
        loadPackages(user);
        // Load and apply preferences
        const prefs = loadPreferences();
        applyTheme(prefs.theme);
        applyPrivacy(prefs.privacyEmailVisible);
        reflectPreferencesUI(prefs);
    } catch (error) {
        console.error('❌ Profile init error:', error);
        showNotification('Profil yüklenirken hata oluştu', 'error');
    }
}

// Load profile data
function loadProfileData(user) {
    // Update new navbar user elements
    const navUserName = document.getElementById('navUserName');
    const ddUserName = document.getElementById('ddUserName');
    const ddUserEmail = document.getElementById('ddUserEmail');
    if (navUserName) navUserName.textContent = user.name || 'Profilim';
    if (ddUserName) ddUserName.textContent = user.name || 'Kullanıcı';
    if (ddUserEmail) ddUserEmail.textContent = user.email || '';

    // Profile header
    document.getElementById('profileName').textContent = user.name || 'Kullanıcı';
    document.getElementById('profileEmail').textContent = user.email || '';

    // Stats
    const joinDate = new Date(user.createdAt || Date.now());
    document.getElementById('statJoinDate').textContent = formatDate(joinDate);
    
    const packagesCount = user.purchasedPackages?.length || 0;
    document.getElementById('statPackages').textContent = packagesCount;
    
    document.getElementById('statActivity').textContent = 'Bugün';
    document.getElementById('accountCreated').textContent = formatRelativeTime(joinDate);

    // Member badge
    const memberBadge = document.getElementById('memberBadge');
    if (packagesCount > 0) {
        memberBadge.textContent = 'Premium Üye';
        memberBadge.style.background = 'rgba(102, 126, 234, 0.2)';
        memberBadge.style.color = '#667eea';
        memberBadge.style.borderColor = 'rgba(102, 126, 234, 0.3)';
    }
}

// Navbar interaction module
function initNavbarInteractions() {
    const nav = document.querySelector('.navbar');
    const userBtn = document.getElementById('navUserBtn');
    const dropdown = document.getElementById('navUserDropdown');
    let lastScrollY = window.scrollY;

    // Toggle dropdown
    if (userBtn && dropdown) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = userBtn.getAttribute('aria-expanded') === 'true';
            userBtn.setAttribute('aria-expanded', String(!expanded));
            dropdown.classList.toggle('active', !expanded);
        });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (dropdown && userBtn) {
            if (!dropdown.contains(e.target) && !userBtn.contains(e.target)) {
                dropdown.classList.remove('active');
                userBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdown && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
            userBtn && userBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Scroll hide/show behavior
    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        if (!nav) return;
        if (currentY > lastScrollY && currentY > 100) {
            nav.classList.add('hide-up');
        } else {
            nav.classList.remove('hide-up');
        }
        lastScrollY = currentY;
    });
}

// Load packages
function loadPackages(user) {
    const packagesList = document.getElementById('packagesList');
    const packages = user.purchasedPackages || [];

    if (packages.length === 0) {
        return; // Empty state already shown in HTML
    }

    // Package details mapping
    const packageDetails = {
        'Temel': { icon: '📦', description: 'Temel Web Sitesi' },
        'Pro': { icon: '⚡', description: 'Profesyonel Web Sitesi' },
        'Premium': { icon: '👑', description: 'Premium Web Sitesi' },
        'E-Ticaret': { icon: '🛒', description: 'E-Ticaret Sitesi' },
        'Kurumsal': { icon: '🏢', description: 'Kurumsal Web Sitesi' },
        'Portföy': { icon: '🎨', description: 'Portföy Web Sitesi' }
    };

    packagesList.innerHTML = packages.map(pkg => {
        const details = packageDetails[pkg] || { icon: '📦', description: pkg };
        return `
            <div class="package-item">
                <div class="package-info">
                    <div class="package-icon">
                        <span style="font-size: 24px;">${details.icon}</span>
                    </div>
                    <div class="package-details">
                        <h3>${pkg}</h3>
                        <p class="package-date">${details.description}</p>
                    </div>
                </div>
                <span class="package-status">Aktif</span>
            </div>
        `;
    }).join('');
}

// Setup event listeners
function setupEventListeners(user) {
    // Logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', handleLogout);
    }

    // Avatar edit
    const avatarEditBtn = document.getElementById('avatarEditBtn');
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', () => {
            showNotification('Profil fotoğrafı değiştirme özelliği yakında eklenecek', 'info');
        });
    }

    // Edit profile
    const btnEditProfile = document.getElementById('btnEditProfile');
    if (btnEditProfile) {
        btnEditProfile.addEventListener('click', () => {
            showEditProfileModal(user);
        });
    }

    // Change password
    const btnChangePassword = document.getElementById('btnChangePassword');
    if (btnChangePassword) {
        btnChangePassword.addEventListener('click', () => {
            showNotification('Şifre değiştirme özelliği yakında eklenecek', 'info');
        });
    }

    // Delete account
    const btnDeleteAccount = document.getElementById('btnDeleteAccount');
    if (btnDeleteAccount) {
        btnDeleteAccount.addEventListener('click', handleDeleteAccount);
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Theme toggle
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            const newTheme = themeSwitch.checked ? 'dark' : 'light';
            savePreference('theme', newTheme);
            applyTheme(newTheme);
            document.getElementById('themeStatus').textContent = newTheme === 'dark' ? 'Koyu Mod' : 'Açık Mod';
            showNotification(`Tema değiştirildi: ${newTheme === 'dark' ? 'Koyu' : 'Açık'}`, 'success');
        });
    }

    // Language select
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', () => {
            const lang = languageSelect.value;
            savePreference('language', lang);
            document.getElementById('languageStatus').textContent = lang === 'tr' ? 'Türkçe' : 'English';
            showNotification(`Dil ayarlandı: ${lang === 'tr' ? 'Türkçe' : 'English'}`, 'info');
        });
    }

    // Privacy switch
    const privacySwitch = document.getElementById('privacySwitch');
    if (privacySwitch) {
        privacySwitch.addEventListener('change', () => {
            const visible = privacySwitch.checked;
            savePreference('privacyEmailVisible', String(visible));
            applyPrivacy(visible);
            document.getElementById('privacyStatus').textContent = visible ? 'Email Görünüyor' : 'Email Gizli';
            showNotification(`Email ${visible ? 'görünür' : 'gizli'} yapıldı`, 'info');
        });
    }

    // Logout all sessions (simulated)
    const btnLogoutAll = document.getElementById('btnLogoutAll');
    if (btnLogoutAll) {
        btnLogoutAll.addEventListener('click', () => {
            if (confirm('Tüm oturumları kapatmak istiyor musunuz? (Yerel cihaz + diğer cihazlar)')) {
                // Simulated: just clear token
                localStorage.removeItem('user_token');
                localStorage.removeItem('user_info');
                showNotification('Tüm oturumlar kapatıldı (simülasyon)', 'warning');
                setTimeout(() => window.location.href = 'index.html', 1200);
            }
        });
    }

    // Export data
    const btnExportData = document.getElementById('btnExportData');
    if (btnExportData) {
        btnExportData.addEventListener('click', () => {
            exportUserData(user);
        });
    }
}

// Logout handler
function handleLogout() {
    if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_info');
        showNotification('Başarıyla çıkış yapıldı', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Delete account handler
function handleDeleteAccount() {
    const confirmed = confirm(
        'UYARI: Hesabınızı kalıcı olarak silmek üzeresiniz. ' +
        'Bu işlem geri alınamaz ve tüm verileriniz silinecektir. ' +
        'Devam etmek istediğinizden emin misiniz?'
    );

    if (confirmed) {
        const doubleConfirm = confirm('Son kez soruyoruz: Hesabınızı silmek istediğinize %100 emin misiniz?');
        if (doubleConfirm) {
            showNotification('Hesap silme özelliği yakında eklenecek', 'warning');
            // TODO: Implement account deletion API call
        }
    }
}

// Show edit profile modal
function showEditProfileModal(user) {
    const modal = document.createElement('div');
    modal.className = 'auth-modal-overlay';
    modal.innerHTML = `
        <div class="auth-modal" style="max-width: 500px;">
            <button class="auth-modal-close" onclick="this.closest('.auth-modal-overlay').remove()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="auth-modal-header">
                <h2>Profili Düzenle</h2>
            </div>
            <form class="auth-form" id="editProfileForm">
                <div class="auth-input-group">
                    <label for="edit-name">İsim</label>
                    <input type="text" id="edit-name" class="auth-input" value="${user.name || ''}" required>
                    <div class="auth-error" id="edit-name-err"></div>
                </div>
                <div class="auth-input-group">
                    <label for="edit-email">E-posta</label>
                    <input type="email" id="edit-email" class="auth-input" value="${user.email || ''}" disabled>
                    <small style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">E-posta değiştirilemez</small>
                </div>
                <button type="submit" class="auth-button">Kaydet</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);

    // Handle form submit
    const form = document.getElementById('editProfileForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = document.getElementById('edit-name').value.trim();
        
        if (newName && newName !== user.name) {
            // Update local storage
            user.name = newName;
            localStorage.setItem('user_info', JSON.stringify(user));
            
            // Update UI
            document.getElementById('profileName').textContent = newName;
            
            showNotification('Profil güncellendi', 'success');
            modal.remove();
            
            // TODO: Send update to backend
        } else {
            modal.remove();
        }
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Preferences helpers
function loadPreferences() {
    return {
        theme: localStorage.getItem('pref_theme') || 'light',
        language: localStorage.getItem('pref_language') || 'tr',
        privacyEmailVisible: localStorage.getItem('pref_privacyEmailVisible') === 'false' ? false : true
    };
}

function savePreference(key, value) {
    localStorage.setItem(`pref_${key}`, value);
}

function applyTheme(theme) {
    const body = document.body;
    if (!body.classList.contains('profile-page')) return;
    if (theme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

function applyPrivacy(visible) {
    const emailEl = document.getElementById('profileEmail');
    const ddEmail = document.getElementById('ddUserEmail');
    if (emailEl) emailEl.style.visibility = visible ? 'visible' : 'hidden';
    if (ddEmail) ddEmail.style.visibility = visible ? 'visible' : 'hidden';
}

function reflectPreferencesUI(prefs) {
    const themeSwitch = document.getElementById('themeSwitch');
    const languageSelect = document.getElementById('languageSelect');
    const privacySwitch = document.getElementById('privacySwitch');
    if (themeSwitch) {
        themeSwitch.checked = prefs.theme === 'dark';
        const status = document.getElementById('themeStatus');
        if (status) status.textContent = prefs.theme === 'dark' ? 'Koyu Mod' : 'Açık Mod';
    }
    if (languageSelect) {
        languageSelect.value = prefs.language;
        const langStatus = document.getElementById('languageStatus');
        if (langStatus) langStatus.textContent = prefs.language === 'tr' ? 'Türkçe' : 'English';
    }
    if (privacySwitch) {
        privacySwitch.checked = prefs.privacyEmailVisible;
        const privStatus = document.getElementById('privacyStatus');
        if (privStatus) privStatus.textContent = prefs.privacyEmailVisible ? 'Email Görünüyor' : 'Email Gizli';
    }
}

function exportUserData(user) {
    try {
        const prefs = loadPreferences();
        const exportObj = {
            profile: {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                packages: user.purchasedPackages || []
            },
            preferences: prefs,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'profil_verileri.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showNotification('Veriler indirildi', 'success');
    } catch (e) {
        console.error(e);
        showNotification('Veri indirme başarısız', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'rgba(74, 222, 128, 0.9)' : 
                     type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 
                     type === 'warning' ? 'rgba(251, 191, 36, 0.9)' : 
                     'rgba(102, 126, 234, 0.9)'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Utility: Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('tr-TR', options);
}

// Utility: Format relative time
function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 30) return formatDate(date);
    if (days > 0) return `${days} gün önce`;
    if (hours > 0) return `${hours} saat önce`;
    if (minutes > 0) return `${minutes} dakika önce`;
    return 'Az önce';
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
