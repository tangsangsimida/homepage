// 主要JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 页面加载动画
    const body = document.body;
    const pageTransition = document.createElement('div');
    pageTransition.classList.add('page-transition');
    pageTransition.innerHTML = '<div class="loader"></div>';
    body.appendChild(pageTransition);
    
    // 页面完全加载后移除加载动画
    window.addEventListener('load', function() {
        setTimeout(function() {
            pageTransition.style.opacity = '0';
            pageTransition.style.visibility = 'hidden';
        }, 500);
    });
    
    // 处理浏览器前进/后退按钮
    window.addEventListener('pageshow', function(event) {
        // 如果是从缓存加载的页面，确保过渡动画不显示
        if (event.persisted) {
            const transitions = document.querySelectorAll('.page-transition');
            transitions.forEach(function(transition) {
                transition.style.opacity = '0';
                transition.style.visibility = 'hidden';
            });
        }
    });

    // 导航栏滚动效果
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 滚动渐入效果
    const fadeElements = document.querySelectorAll('.highlights-grid > div, .projects-showcase > div, .awards-slider > div, .skills-container > div, .timeline-item, .interests-grid > div');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-section', 'is-visible');
                if (element.classList.contains('timeline-item')) {
                    element.classList.add('visible');
                }
            }
        });
    };
    
    // 初始检查元素是否在视口中
    fadeInOnScroll();
    
    // 滚动时检查元素是否在视口中
    window.addEventListener('scroll', fadeInOnScroll);

    // 奖项滑块自动滚动 - 通过CSS动画实现
    const awardsSlider = document.querySelector('.awards-slider');
    if (awardsSlider) {
        const slides = Array.from(awardsSlider.children);
        const slideCount = slides.length;

        if (slideCount > 0) {
            // Clone slides for seamless loop
            slides.forEach(slide => {
                const clone = slide.cloneNode(true);
                awardsSlider.appendChild(clone);
            });

            // Dynamically set animation duration for consistent speed
            const animationDuration = slideCount * 5; // 5 seconds per original slide
            awardsSlider.style.animationDuration = `${animationDuration}s`;
        }
    }

    // 联系表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const formValues = {};
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 这里可以添加表单验证逻辑
            
            // 模拟表单提交
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<span class="loader"></span> 发送中...';
            submitButton.disabled = true;
            
            // 模拟异步提交
            setTimeout(() => {
                // 重置表单
                contactForm.reset();
                submitButton.innerHTML = '发送成功!';
                
                // 显示成功消息
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = '您的留言已成功发送，我会尽快回复您！';
                successMessage.style.color = '#4CAF50';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '20px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                successMessage.style.textAlign = 'center';
                
                contactForm.appendChild(successMessage);
                
                // 3秒后恢复按钮状态
                setTimeout(() => {
                    submitButton.innerHTML = '发送留言';
                    submitButton.disabled = false;
                    
                    // 5秒后移除成功消息
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 3000);
            }, 2000);
        });
    }

    // 添加3D卡片效果
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX * 5; // max 5 degrees
            const deltaY = (y - centerY) / centerY * 5; // max 5 degrees
            
            this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // 添加打字机效果
    const typingElements = document.querySelectorAll('.typewriter');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        typeWriter();
    });

    // 添加视差滚动效果
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加返回顶部按钮
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.classList.add('back-to-top');
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.backgroundColor = '#6e8efb';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.display = 'none';
    backToTopButton.style.zIndex = '999';
    backToTopButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    backToTopButton.style.transition = 'all 0.3s ease';
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#a777e3';
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#6e8efb';
        this.style.transform = 'translateY(0)';
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // 添加移动端菜单切换
    const createMobileMenu = function() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const menuToggle = document.createElement('div');
        
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.style.display = 'none';
        menuToggle.style.fontSize = '24px';
        menuToggle.style.cursor = 'pointer';
        menuToggle.style.color = '#333';
        
        header.querySelector('.container').appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // 媒体查询，在小屏幕上显示菜单按钮
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        function handleScreenChange(e) {
            if (e.matches) {
                menuToggle.style.display = 'block';
                nav.style.display = 'none';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                nav.style.padding = '20px';
                nav.style.zIndex = '999';
                
                const navUl = nav.querySelector('ul');
                navUl.style.flexDirection = 'column';
                navUl.style.gap = '15px';
                
                const navItems = nav.querySelectorAll('li');
                navItems.forEach(item => {
                    item.style.margin = '0';
                });
            } else {
                menuToggle.style.display = 'none';
                nav.style.display = 'block';
                nav.style.position = 'static';
                nav.style.width = 'auto';
                nav.style.backgroundColor = 'transparent';
                nav.style.boxShadow = 'none';
                nav.style.padding = '0';
                
                const navUl = nav.querySelector('ul');
                navUl.style.flexDirection = 'row';
                
                const navItems = nav.querySelectorAll('li');
                navItems.forEach(item => {
                    item.style.margin = '0 0 0 30px';
                });
            }
        }
        
        // 初始检查
        handleScreenChange(mediaQuery);
        
        // 监听屏幕变化
        mediaQuery.addEventListener('change', handleScreenChange);
        
        // 点击菜单项后关闭菜单并添加页面过渡效果
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // 只处理站内链接
                if (link.hostname === window.location.hostname) {
                    // 关闭移动端菜单
                    if (mediaQuery.matches) {
                        nav.classList.remove('active');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    // 直接跳转，不添加任何过渡效果
                }
            });
        });
    };
    
    createMobileMenu();
});