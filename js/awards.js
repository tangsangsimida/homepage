// 奖项页面JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 奖项筛选功能
    const initAwardFilters = function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const awardCards = document.querySelectorAll('.award-item');
        
        if (filterButtons.length > 0 && awardCards.length > 0) {
            // 初始化Isotope网格布局
            const grid = document.querySelector('.gallery');
            let iso;
            
            // 检查是否已加载Isotope库
            if (typeof Isotope !== 'undefined' && grid) {
                iso = new Isotope(grid, {
                    itemSelector: '.award-item',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.award-item',
                        gutter: 20
                    },
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
                        if (filterValue === 'all') {
                            iso.arrange({ filter: '*' });
                        } else {
                            iso.arrange({ filter: function(itemElem) {
                                return itemElem.getAttribute('data-category').includes(filterValue);
                            }});
                        }
                    } else {
                        // 基本筛选
                        awardCards.forEach(card => {
                            if (filterValue === 'all') {
                                card.style.display = 'block';
                            } else if (card.getAttribute('data-category').includes(filterValue)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }
                    
                    // 添加动画效果
                    setTimeout(() => {
                        const visibleCards = document.querySelectorAll('.award-card:not([style*="display: none"])');
                        visibleCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in-section', 'is-visible');
                            }, index * 100);
                        });
                    }, 100);
                });
            });
            
            // 默认点击"全部"按钮
            const allButton = document.querySelector('.filter-btn[data-filter="all"]');
            if (allButton) {
                allButton.click();
            }
        }
    };
    
    // 初始化筛选功能
    initAwardFilters();
    
    // 初始化灯箱效果
    const initLightGallery = function() {
        const awardCards = document.querySelectorAll('.award-card');
        
        // 检查是否已加载lightGallery库
        if (typeof lightGallery !== 'undefined') {
            // 为每个奖项卡片添加点击事件
            awardCards.forEach(card => {
                card.addEventListener('click', function() {
                    const imageElement = this.querySelector('.award-image');
                    const imageUrl = imageElement.getAttribute('src');
                    const title = this.querySelector('.award-title').textContent;
                    const description = this.querySelector('.award-description').textContent;
                    
                    // 创建临时容器用于lightGallery
                    const galleryContainer = document.createElement('div');
                    galleryContainer.id = 'lightgallery-temp';
                    galleryContainer.style.display = 'none';
                    
                    // 创建图片项
                    const galleryItem = document.createElement('a');
                    galleryItem.href = imageUrl;
                    galleryItem.setAttribute('data-sub-html', `<h4>${title}</h4><p>${description}</p>`);
                    
                    const galleryImage = document.createElement('img');
                    galleryImage.src = imageUrl;
                    galleryImage.alt = title;
                    
                    galleryItem.appendChild(galleryImage);
                    galleryContainer.appendChild(galleryItem);
                    document.body.appendChild(galleryContainer);
                    
                    // 初始化lightGallery
                    const gallery = lightGallery(galleryContainer, {
                        dynamic: true,
                        dynamicEl: [{
                            src: imageUrl,
                            thumb: imageUrl,
                            subHtml: `<h4>${title}</h4><p>${description}</p>`
                        }],
                        download: false,
                        counter: false,
                        backdropDuration: 400,
                        speed: 500,
                        addClass: 'lg-award-gallery',
                        getCaptionFromTitleOrAlt: false
                    });
                    
                    // 灯箱关闭后移除临时容器
                    gallery.addEventListener('lgAfterClose', () => {
                        galleryContainer.remove();
                    });
                });
            });
        } else {
            // 如果没有加载lightGallery库，使用基本的模态框
            console.warn('lightGallery library not loaded. Using basic modal.');
            
            awardCards.forEach(card => {
                card.addEventListener('click', function() {
                    const imageElement = this.querySelector('.award-image');
                    const imageUrl = imageElement.getAttribute('src');
                    const title = this.querySelector('.award-title').textContent;
                    const description = this.querySelector('.award-description').textContent;
                    
                    // 创建模态框
                    const modal = document.createElement('div');
                    modal.classList.add('award-modal');
                    modal.innerHTML = `
                        <div class="modal-content glass-card">
                            <span class="close-modal">&times;</span>
                            <div class="modal-header">
                                <h2>${title}</h2>
                            </div>
                            <div class="modal-body">
                                <div class="modal-image-container">
                                    <img src="${imageUrl}" alt="${title}" class="modal-image">
                                </div>
                                <div class="modal-description">
                                    <p>${description}</p>
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
                    modalContent.style.maxWidth = '800px';
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
                    
                    const modalImage = modal.querySelector('.modal-image');
                    modalImage.style.width = '100%';
                    modalImage.style.height = 'auto';
                    modalImage.style.borderRadius = '5px';
                    modalImage.style.marginBottom = '20px';
                    
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
        }
    };
    
    // 奖项卡片悬停效果
    const initAwardCardHover = function() {
        const awardCards = document.querySelectorAll('.award-card');
        
        awardCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
                
                // 添加图片缩放效果
                const cardImage = this.querySelector('.award-image');
                if (cardImage) {
                    cardImage.style.transform = 'scale(1.05)';
                }
                
                // 添加卡片内容上移效果
                const cardContent = this.querySelector('.award-content');
                if (cardContent) {
                    cardContent.style.transform = 'translateY(-10px)';
                    cardContent.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
                
                // 恢复图片大小
                const cardImage = this.querySelector('.award-image');
                if (cardImage) {
                    cardImage.style.transform = 'scale(1)';
                }
                
                // 恢复卡片内容位置
                const cardContent = this.querySelector('.award-content');
                if (cardContent) {
                    cardContent.style.transform = 'translateY(0)';
                    cardContent.style.opacity = '0.8';
                }
            });
        });
    };
    
    // 添加年份时间线效果
    const initYearTimeline = function() {
        const yearSections = document.querySelectorAll('.year-section');
        
        if (yearSections.length > 0) {
            // 创建时间线容器
            const timelineContainer = document.createElement('div');
            timelineContainer.classList.add('awards-timeline');
            timelineContainer.style.position = 'fixed';
            timelineContainer.style.top = '50%';
            timelineContainer.style.right = '20px';
            timelineContainer.style.transform = 'translateY(-50%)';
            timelineContainer.style.display = 'flex';
            timelineContainer.style.flexDirection = 'column';
            timelineContainer.style.alignItems = 'center';
            timelineContainer.style.gap = '15px';
            timelineContainer.style.zIndex = '100';
            
            // 为每个年份创建时间线点
            yearSections.forEach((section, index) => {
                const year = section.getAttribute('data-year');
                const timelinePoint = document.createElement('div');
                timelinePoint.classList.add('timeline-point');
                timelinePoint.setAttribute('data-year', year);
                timelinePoint.style.width = '12px';
                timelinePoint.style.height = '12px';
                timelinePoint.style.borderRadius = '50%';
                timelinePoint.style.backgroundColor = '#6e8efb';
                timelinePoint.style.cursor = 'pointer';
                timelinePoint.style.position = 'relative';
                timelinePoint.style.transition = 'all 0.3s ease';
                
                // 添加年份标签
                const yearLabel = document.createElement('span');
                yearLabel.textContent = year;
                yearLabel.style.position = 'absolute';
                yearLabel.style.right = '20px';
                yearLabel.style.top = '50%';
                yearLabel.style.transform = 'translateY(-50%)';
                yearLabel.style.color = '#333';
                yearLabel.style.fontSize = '14px';
                yearLabel.style.fontWeight = 'bold';
                yearLabel.style.opacity = '0';
                yearLabel.style.transition = 'opacity 0.3s ease';
                
                timelinePoint.appendChild(yearLabel);
                
                // 添加悬停效果
                timelinePoint.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.5)';
                    this.style.backgroundColor = '#a777e3';
                    yearLabel.style.opacity = '1';
                });
                
                timelinePoint.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('active')) {
                        this.style.transform = 'scale(1)';
                        this.style.backgroundColor = '#6e8efb';
                    }
                    yearLabel.style.opacity = '0';
                });
                
                // 添加点击事件
                timelinePoint.addEventListener('click', function() {
                    const targetSection = document.querySelector(`.year-section[data-year="${year}"]`);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
                
                timelineContainer.appendChild(timelinePoint);
            });
            
            // 添加时间线连接线
            const timelineLine = document.createElement('div');
            timelineLine.classList.add('timeline-line');
            timelineLine.style.position = 'absolute';
            timelineLine.style.top = '0';
            timelineLine.style.bottom = '0';
            timelineLine.style.left = '50%';
            timelineLine.style.width = '2px';
            timelineLine.style.backgroundColor = 'rgba(110, 142, 251, 0.3)';
            timelineLine.style.transform = 'translateX(-50%)';
            timelineLine.style.zIndex = '-1';
            
            timelineContainer.appendChild(timelineLine);
            document.body.appendChild(timelineContainer);
            
            // 滚动时更新活动点
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY + window.innerHeight / 2;
                
                yearSections.forEach((section, index) => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const timelinePoint = timelineContainer.querySelectorAll('.timeline-point')[index];
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        // 当前部分在视口中
                        timelinePoint.classList.add('active');
                        timelinePoint.style.transform = 'scale(1.5)';
                        timelinePoint.style.backgroundColor = '#a777e3';
                    } else {
                        // 当前部分不在视口中
                        timelinePoint.classList.remove('active');
                        timelinePoint.style.transform = 'scale(1)';
                        timelinePoint.style.backgroundColor = '#6e8efb';
                    }
                });
            });
            
            // 检查是否在移动设备上，如果是则隐藏时间线
            function checkDevice() {
                if (window.innerWidth <= 768) {
                    timelineContainer.style.display = 'none';
                } else {
                    timelineContainer.style.display = 'flex';
                }
            }
            
            // 初始检查
            checkDevice();
            
            // 窗口大小变化时检查
            window.addEventListener('resize', checkDevice);
        }
    };
    
    // 执行初始化函数
    initAwardFilters();
    initLightGallery();
    initAwardCardHover();
    initYearTimeline();
});