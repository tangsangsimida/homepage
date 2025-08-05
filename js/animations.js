// 动画相关JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 粒子背景效果
    const createParticleBackground = function() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        // 粒子配置
        const particleCount = 50;
        const particleColor = 'rgba(110, 142, 251, 0.6)';
        const particleSize = 2;
        const particleMinSize = 0.5;
        const lineColor = 'rgba(110, 142, 251, 0.2)';
        const lineWidth = 1;
        const lineMaxLength = 150;
        const particleSpeed = 0.5;

        // 粒子数组
        let particles = [];

        // 创建粒子
        function Particle() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = Math.random() * particleSpeed * 2 - particleSpeed;
            this.vy = Math.random() * particleSpeed * 2 - particleSpeed;
            this.size = Math.random() * particleSize + particleMinSize;
        }

        // 更新粒子位置
        Particle.prototype.update = function() {
            this.x += this.vx;
            this.y += this.vy;

            // 边界检测
            if (this.x < 0 || this.x > width) {
                this.vx = -this.vx;
            }

            if (this.y < 0 || this.y > height) {
                this.vy = -this.vy;
            }
        };

        // 绘制粒子
        Particle.prototype.draw = function() {
            ctx.fillStyle = particleColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        };

        // 绘制粒子之间的连线
        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < lineMaxLength) {
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = lineWidth;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // 初始化粒子
        function init() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        // 动画循环
        function animate() {
            ctx.clearRect(0, 0, width, height);

            // 更新并绘制所有粒子
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            // 绘制连线
            drawLines();

            requestAnimationFrame(animate);
        }

        // 窗口大小变化时重新设置画布大小
        window.addEventListener('resize', function() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        });

        // 初始化并开始动画
        init();
        animate();
    };

    // 鼠标跟随效果
    const createMouseFollowEffect = function() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.style.position = 'fixed';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderRadius = '50%';
        cursor.style.border = '2px solid #6e8efb';
        cursor.style.pointerEvents = 'none';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.zIndex = '9999';
        cursor.style.transition = 'width 0.3s, height 0.3s, background-color 0.3s';
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        cursorDot.style.position = 'fixed';
        cursorDot.style.width = '5px';
        cursorDot.style.height = '5px';
        cursorDot.style.borderRadius = '50%';
        cursorDot.style.backgroundColor = '#a777e3';
        cursorDot.style.pointerEvents = 'none';
        cursorDot.style.transform = 'translate(-50%, -50%)';
        cursorDot.style.zIndex = '9999';
        document.body.appendChild(cursorDot);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let cursorDotX = 0;
        let cursorDotY = 0;
        const speed = 0.1;
        const dotSpeed = 0.3;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // 鼠标悬停在链接和按钮上时的效果
        const handleLinkHover = function() {
            const links = document.querySelectorAll('a, button, .glass-card, .project-card, .award-card');
            links.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    cursor.style.width = '40px';
                    cursor.style.height = '40px';
                    cursor.style.backgroundColor = 'rgba(167, 119, 227, 0.1)';
                    cursor.style.mixBlendMode = 'difference';
                });

                link.addEventListener('mouseleave', function() {
                    cursor.style.width = '20px';
                    cursor.style.height = '20px';
                    cursor.style.backgroundColor = 'transparent';
                    cursor.style.mixBlendMode = 'normal';
                });
            });
        };

        handleLinkHover();

        // 动画循环
        function animate() {
            // 平滑跟随鼠标
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // 点的移动更快
            cursorDotX += (mouseX - cursorDotX) * dotSpeed;
            cursorDotY += (mouseY - cursorDotY) * dotSpeed;
            cursorDot.style.left = cursorDotX + 'px';
            cursorDot.style.top = cursorDotY + 'px';

            requestAnimationFrame(animate);
        }

        animate();

        // 在移动设备上隐藏自定义光标
        function checkDevice() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                cursor.style.display = 'none';
                cursorDot.style.display = 'none';
            }
        }

        checkDevice();
    };

    // 技能条动画
    const animateSkillBars = function() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        if (skillBars.length > 0) {
            const animateBar = function(bar) {
                const percentage = bar.getAttribute('data-percentage');
                const progress = bar.querySelector('.progress');
                
                progress.style.width = '0';
                
                setTimeout(() => {
                    progress.style.width = percentage + '%';
                }, 100);
            };
            
            // 检查元素是否在视口中
            const isInViewport = function(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.bottom >= 0
                );
            };
            
            // 初始检查
            const checkSkillBars = function() {
                skillBars.forEach(bar => {
                    if (isInViewport(bar) && !bar.classList.contains('animated')) {
                        animateBar(bar);
                        bar.classList.add('animated');
                    }
                });
            };
            
            // 滚动时检查
            window.addEventListener('scroll', checkSkillBars);
            
            // 初始检查
            checkSkillBars();
        }
    };

    // 波浪动画效果
    const createWaveEffect = function() {
        const sections = document.querySelectorAll('.hero-section, .section-divider');
        
        sections.forEach(section => {
            const wave = document.createElement('div');
            wave.classList.add('wave-container');
            wave.innerHTML = `
                <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgba(110, 142, 251, 0.2)" fill-opacity="1" d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <svg class="wave wave-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgba(167, 119, 227, 0.2)" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            `;
            
            // 添加样式
            wave.style.position = 'absolute';
            wave.style.bottom = '0';
            wave.style.left = '0';
            wave.style.width = '100%';
            wave.style.overflow = 'hidden';
            wave.style.lineHeight = '0';
            wave.style.zIndex = '-1';
            
            // 添加波浪动画
            const waveElements = wave.querySelectorAll('.wave');
            waveElements.forEach((waveEl, index) => {
                waveEl.style.animation = `wave-animation ${6 + index * 2}s linear infinite alternate`;
                waveEl.style.transformOrigin = 'center bottom';
            });
            
            // 确保section有相对定位
            if (getComputedStyle(section).position === 'static') {
                section.style.position = 'relative';
            }
            
            section.appendChild(wave);
        });
        
        // 添加波浪动画的关键帧
        if (!document.querySelector('#wave-animation-keyframes')) {
            const style = document.createElement('style');
            style.id = 'wave-animation-keyframes';
            style.textContent = `
                @keyframes wave-animation {
                    0% {
                        transform: translateX(-25%) scale(1, 1);
                    }
                    50% {
                        transform: translateX(0%) scale(1, 1.1);
                    }
                    100% {
                        transform: translateX(25%) scale(1, 1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // 滚动指示器
    const createScrollIndicator = function() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.classList.add('scroll-indicator');
        scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
        document.body.appendChild(scrollIndicator);

        // 添加样式
        scrollIndicator.style.position = 'fixed';
        scrollIndicator.style.top = '0';
        scrollIndicator.style.left = '0';
        scrollIndicator.style.width = '100%';
        scrollIndicator.style.height = '4px';
        scrollIndicator.style.zIndex = '1000';
        scrollIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';

        const scrollProgress = scrollIndicator.querySelector('.scroll-progress');
        scrollProgress.style.height = '100%';
        scrollProgress.style.width = '0';
        scrollProgress.style.backgroundColor = 'linear-gradient(90deg, #6e8efb, #a777e3)';
        scrollProgress.style.transition = 'width 0.1s';

        // 更新滚动进度
        window.addEventListener('scroll', function() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;

            scrollProgress.style.width = scrollPercentage + '%';
            scrollProgress.style.background = `linear-gradient(90deg, #6e8efb ${scrollPercentage}%, #a777e3)`;
        });
    };

    // 执行动画函数
    createParticleBackground();
    createMouseFollowEffect();
    animateSkillBars();
    createWaveEffect();
    createScrollIndicator();
});

// 添加页面过渡动画
window.addEventListener('load', function() {
    // 移除页面加载动画
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        pageTransition.style.opacity = '0';
        setTimeout(() => {
            pageTransition.remove();
        }, 500);
    }

    // 添加页面内容的淡入效果
    document.body.classList.add('loaded');
});

// 页面离开前的过渡动画
// 页面过渡动画已移除，现在使用默认的链接跳转行为