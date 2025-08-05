// 项目页面JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 项目筛选功能
    const initProjectFilters = function() {
        const filterButtons = document.querySelectorAll('.filter-button');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length > 0 && projectCards.length > 0) {
            // 初始化Isotope网格布局
            const grid = document.querySelector('.projects-grid');
            let iso;
            
            // 检查是否已加载Isotope库
            if (typeof Isotope !== 'undefined') {
                iso = new Isotope(grid, {
                    itemSelector: '.project-card',
                    layoutMode: 'fitRows',
                    transitionDuration: '0.6s',
                    stagger: 30
                });
            } else {
                // 如果没有加载Isotope库，使用基本的筛选功能
                console.warn('Isotope library not loaded. Using basic filtering.');
            }
            
            // 点击筛选按钮
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // 移除所有按钮的active类
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // 添加当前按钮的active类
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    if (iso) {
                        // 使用Isotope筛选
                        if (filterValue === '*') {
                            iso.arrange({ filter: '*' });
                        } else {
                            iso.arrange({ filter: `.${filterValue}` });
                        }
                    } else {
                        // 基本筛选
                        projectCards.forEach(card => {
                            if (filterValue === '*') {
                                card.style.display = 'block';
                            } else if (card.classList.contains(filterValue)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }
                    
                    // 添加动画效果
                    setTimeout(() => {
                        const visibleCards = document.querySelectorAll('.project-card:not([style*="display: none"])');
                        visibleCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in-section', 'is-visible');
                            }, index * 100);
                        });
                    }, 100);
                });
            });
            
            // 默认点击"全部"按钮
            const allButton = document.querySelector('.filter-button[data-filter="*"]');
            if (allButton) {
                allButton.click();
            }
        }
    };
    
    // 项目详情模态框
    const initProjectModals = function() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                // 获取项目数据
                const projectId = this.getAttribute('data-id');
                const projectTitle = this.querySelector('.project-title').textContent;
                const projectImage = this.querySelector('.project-image').getAttribute('src');
                const projectTags = Array.from(this.querySelectorAll('.project-tag')).map(tag => tag.textContent);
                const projectDate = this.querySelector('.project-date').textContent;
                const projectTeam = this.querySelector('.project-team').textContent;
                const projectDescription = this.querySelector('.project-description').textContent;
                const projectFeatures = Array.from(this.querySelectorAll('.project-features li')).map(li => li.textContent);
                const projectTech = Array.from(this.querySelectorAll('.project-tech li')).map(li => li.textContent);
                
                // 创建模态框
                const modal = document.createElement('div');
                modal.classList.add('project-modal');
                modal.innerHTML = `
                    <div class="modal-content glass-card">
                        <span class="close-modal">&times;</span>
                        <div class="modal-header">
                            <h2>${projectTitle}</h2>
                            <div class="project-tags">
                                ${projectTags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <div class="modal-body">
                            <div class="modal-image-container">
                                <img src="${projectImage}" alt="${projectTitle}" class="modal-image">
                            </div>
                            <div class="modal-info">
                                <div class="info-item">
                                    <i class="fas fa-calendar"></i>
                                    <span>${projectDate}</span>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-users"></i>
                                    <span>${projectTeam}</span>
                                </div>
                            </div>
                            <div class="modal-description">
                                <h3>项目描述</h3>
                                <p>${projectDescription}</p>
                            </div>
                            <div class="modal-features">
                                <h3>主要特点</h3>
                                <ul>
                                    ${projectFeatures.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="modal-tech">
                                <h3>技术栈</h3>
                                <ul class="tech-list">
                                    ${projectTech.map(tech => `<li><i class="fas fa-code"></i> ${tech}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                
                // 添加模态框样式
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                modal.style.zIndex = '1000';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.style.opacity = '0';
                modal.style.transition = 'opacity 0.3s ease';
                
                const modalContent = modal.querySelector('.modal-content');
                modalContent.style.width = '80%';
                modalContent.style.maxWidth = '1000px';
                modalContent.style.maxHeight = '90vh';
                modalContent.style.overflow = 'auto';
                modalContent.style.padding = '30px';
                modalContent.style.borderRadius = '10px';
                modalContent.style.position = 'relative';
                modalContent.style.transform = 'translateY(20px)';
                modalContent.style.transition = 'transform 0.3s ease';
                
                const closeModal = modal.querySelector('.close-modal');
                closeModal.style.position = 'absolute';
                closeModal.style.top = '15px';
                closeModal.style.right = '15px';
                closeModal.style.fontSize = '30px';
                closeModal.style.cursor = 'pointer';
                closeModal.style.color = '#333';
                
                const modalHeader = modal.querySelector('.modal-header');
                modalHeader.style.marginBottom = '20px';
                
                const modalImage = modal.querySelector('.modal-image');
                modalImage.style.width = '100%';
                modalImage.style.height = 'auto';
                modalImage.style.borderRadius = '5px';
                modalImage.style.marginBottom = '20px';
                
                const modalInfo = modal.querySelector('.modal-info');
                modalInfo.style.display = 'flex';
                modalInfo.style.gap = '20px';
                modalInfo.style.marginBottom = '20px';
                
                const infoItems = modal.querySelectorAll('.info-item');
                infoItems.forEach(item => {
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    item.style.gap = '10px';
                });
                
                const modalDescription = modal.querySelector('.modal-description');
                modalDescription.style.marginBottom = '20px';
                
                const modalFeatures = modal.querySelector('.modal-features');
                modalFeatures.style.marginBottom = '20px';
                
                const featuresList = modal.querySelector('.modal-features ul');
                featuresList.style.listStyleType = 'none';
                featuresList.style.padding = '0';
                
                const featuresItems = modal.querySelectorAll('.modal-features li');
                featuresItems.forEach(item => {
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    item.style.gap = '10px';
                    item.style.marginBottom = '10px';
                });
                
                const techList = modal.querySelector('.tech-list');
                techList.style.display = 'flex';
                techList.style.flexWrap = 'wrap';
                techList.style.gap = '10px';
                techList.style.listStyleType = 'none';
                techList.style.padding = '0';
                
                const techItems = modal.querySelectorAll('.tech-list li');
                techItems.forEach(item => {
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    item.style.gap = '10px';
                    item.style.backgroundColor = 'rgba(110, 142, 251, 0.1)';
                    item.style.padding = '5px 10px';
                    item.style.borderRadius = '5px';
                });
                
                // 添加模态框到页面
                document.body.appendChild(modal);
                
                // 显示模态框
                setTimeout(() => {
                    modal.style.opacity = '1';
                    modalContent.style.transform = 'translateY(0)';
                }, 10);
                
                // 关闭模态框
                closeModal.addEventListener('click', function() {
                    modal.style.opacity = '0';
                    modalContent.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                });
                
                // 点击模态框外部关闭
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeModal.click();
                    }
                });
                
                // 按ESC键关闭
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeModal.click();
                    }
                });
            });
        });
    };
    
    // 项目卡片悬停效果
    const initProjectCardHover = function() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
                
                // 添加卡片内容上移效果
                const cardContent = this.querySelector('.project-content');
                if (cardContent) {
                    cardContent.style.transform = 'translateY(-10px)';
                }
                
                // 添加图片缩放效果
                const cardImage = this.querySelector('.project-image');
                if (cardImage) {
                    cardImage.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
                
                // 恢复卡片内容位置
                const cardContent = this.querySelector('.project-content');
                if (cardContent) {
                    cardContent.style.transform = 'translateY(0)';
                }
                
                // 恢复图片大小
                const cardImage = this.querySelector('.project-image');
                if (cardImage) {
                    cardImage.style.transform = 'scale(1)';
                }
            });
        });
    };
    
    // 执行初始化函数
    initProjectFilters();
    initProjectModals();
    initProjectCardHover();
});