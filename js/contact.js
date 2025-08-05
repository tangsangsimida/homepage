// 联系页面JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 表单验证功能
    const initFormValidation = function() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            // 添加输入字段的验证样式
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                // 添加焦点效果
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                    
                    // 验证输入
                    validateInput(this);
                });
                
                // 输入时验证
                input.addEventListener('input', function() {
                    validateInput(this);
                });
            });
            
            // 表单提交验证
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                
                // 验证所有输入字段
                formInputs.forEach(input => {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    // 表单验证通过，模拟提交
                    submitForm(contactForm);
                } else {
                    // 滚动到第一个错误字段
                    const firstError = contactForm.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        }
        
        // 验证单个输入字段
        function validateInput(input) {
            const value = input.value.trim();
            const type = input.type;
            const name = input.name;
            const formGroup = input.parentElement;
            let errorMessage = '';
            
            // 移除现有错误消息
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // 验证必填字段
            if (input.required && value === '') {
                errorMessage = '此字段为必填项';
            } else if (value !== '') {
                // 根据输入类型验证
                switch (type) {
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            errorMessage = '请输入有效的电子邮件地址';
                        }
                        break;
                    case 'tel':
                        const phoneRegex = /^[0-9\-\+\s\(\)]{8,20}$/;
                        if (!phoneRegex.test(value)) {
                            errorMessage = '请输入有效的电话号码';
                        }
                        break;
                    case 'textarea':
                        if (value.length < 10) {
                            errorMessage = '留言内容至少需要10个字符';
                        }
                        break;
                }
            }
            
            // 显示错误消息或成功状态
            if (errorMessage) {
                formGroup.classList.add('error');
                formGroup.classList.remove('success');
                
                // 创建错误消息元素
                const errorElement = document.createElement('div');
                errorElement.classList.add('error-message');
                errorElement.textContent = errorMessage;
                errorElement.style.color = '#e74c3c';
                errorElement.style.fontSize = '12px';
                errorElement.style.marginTop = '5px';
                formGroup.appendChild(errorElement);
                
                return false;
            } else if (value !== '') {
                formGroup.classList.remove('error');
                formGroup.classList.add('success');
                return true;
            }
            
            return true;
        }
        
        // 模拟表单提交
        function submitForm(form) {
            // 获取表单数据
            const formData = new FormData(form);
            const formValues = {};
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 禁用提交按钮并显示加载状态
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="loader"></span> 发送中...';
            submitButton.disabled = true;
            
            // 模拟异步提交
            setTimeout(() => {
                // 重置表单
                form.reset();
                
                // 移除所有成功状态
                form.querySelectorAll('.success').forEach(el => {
                    el.classList.remove('success');
                });
                
                // 显示成功消息
                const formContainer = form.parentElement;
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>留言发送成功！</h3>
                    <p>感谢您的留言，我会尽快回复您。</p>
                `;
                
                // 添加成功消息样式
                successMessage.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
                successMessage.style.border = '1px solid rgba(46, 204, 113, 0.3)';
                successMessage.style.borderRadius = '10px';
                successMessage.style.padding = '30px';
                successMessage.style.textAlign = 'center';
                successMessage.style.marginTop = '20px';
                
                const successIcon = successMessage.querySelector('.success-icon');
                successIcon.style.fontSize = '50px';
                successIcon.style.color = '#2ecc71';
                successIcon.style.marginBottom = '15px';
                
                // 添加成功消息到表单后面
                formContainer.appendChild(successMessage);
                
                // 恢复提交按钮状态
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // 滚动到成功消息
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // 5秒后移除成功消息
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 5000);
            }, 2000);
        }
    };
    
    // 初始化谷歌地图
    const initGoogleMap = function() {
        const mapContainer = document.getElementById('map');
        
        if (mapContainer) {
            // 检查是否已加载谷歌地图API
            if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
                // 地图坐标和选项
                const mapOptions = {
                    center: { lat: 39.9042, lng: 116.4074 }, // 北京坐标，可以根据实际位置调整
                    zoom: 15,
                    styles: [
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#333333"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#dedede"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#e9e9e9"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        }
                    ]
                };
                
                // 创建地图
                const map = new google.maps.Map(mapContainer, mapOptions);
                
                // 添加标记
                const marker = new google.maps.Marker({
                    position: mapOptions.center,
                    map: map,
                    title: '我的位置',
                    animation: google.maps.Animation.DROP,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: '#6e8efb',
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeWeight: 2
                    }
                });
                
                // 添加信息窗口
                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div style="padding: 10px; max-width: 200px;">
                            <h3 style="margin: 0 0 5px; color: #333;">我的位置</h3>
                            <p style="margin: 0; color: #666;">欢迎来访！</p>
                        </div>
                    `
                });
                
                // 点击标记时显示信息窗口
                marker.addListener('click', function() {
                    infoWindow.open(map, marker);
                });
                
                // 添加脉冲效果
                const addPulse = function() {
                    const pulseCircle = new google.maps.Circle({
                        strokeColor: '#6e8efb',
                        strokeOpacity: 0.5,
                        strokeWeight: 2,
                        fillColor: '#6e8efb',
                        fillOpacity: 0.3,
                        map: map,
                        center: mapOptions.center,
                        radius: 0,
                        clickable: false
                    });
                    
                    let opacity = 0.5;
                    let radius = 0;
                    const maxRadius = 100;
                    
                    const pulse = setInterval(() => {
                        radius += 1;
                        opacity -= 0.005;
                        
                        if (radius > maxRadius) {
                            clearInterval(pulse);
                            pulseCircle.setMap(null);
                            setTimeout(addPulse, 500);
                        } else {
                            pulseCircle.setRadius(radius);
                            pulseCircle.setOptions({
                                strokeOpacity: opacity,
                                fillOpacity: opacity * 0.6
                            });
                        }
                    }, 10);
                };
                
                // 启动脉冲效果
                addPulse();
            } else {
                // 如果没有加载谷歌地图API，显示替代内容
                mapContainer.innerHTML = `
                    <div class="map-placeholder glass-card">
                        <i class="fas fa-map-marker-alt"></i>
                        <h3>我的位置</h3>
                        <p>北京市海淀区</p>
                        <a href="https://maps.google.com/?q=39.9042,116.4074" target="_blank" class="btn btn-primary">在谷歌地图中查看</a>
                    </div>
                `;
                
                // 添加样式
                const mapPlaceholder = mapContainer.querySelector('.map-placeholder');
                mapPlaceholder.style.display = 'flex';
                mapPlaceholder.style.flexDirection = 'column';
                mapPlaceholder.style.alignItems = 'center';
                mapPlaceholder.style.justifyContent = 'center';
                mapPlaceholder.style.height = '100%';
                mapPlaceholder.style.padding = '30px';
                mapPlaceholder.style.textAlign = 'center';
                
                const mapIcon = mapPlaceholder.querySelector('.fa-map-marker-alt');
                mapIcon.style.fontSize = '50px';
                mapIcon.style.color = '#6e8efb';
                mapIcon.style.marginBottom = '15px';
            }
        }
    };
    
    // 社交媒体图标悬停效果
    const initSocialIconsHover = function() {
        const socialIcons = document.querySelectorAll('.social-icons a');
        
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    };
    
    // 复制联系信息功能
    const initCopyContactInfo = function() {
        const contactItems = document.querySelectorAll('.contact-info-item');
        
        contactItems.forEach(item => {
            const contactValue = item.querySelector('.contact-value');
            const copyButton = document.createElement('button');
            copyButton.classList.add('copy-button');
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.style.background = 'none';
            copyButton.style.border = 'none';
            copyButton.style.cursor = 'pointer';
            copyButton.style.marginLeft = '10px';
            copyButton.style.color = '#6e8efb';
            copyButton.style.opacity = '0';
            copyButton.style.transition = 'opacity 0.3s ease';
            
            contactValue.appendChild(copyButton);
            
            // 显示/隐藏复制按钮
            item.addEventListener('mouseenter', function() {
                copyButton.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', function() {
                copyButton.style.opacity = '0';
            });
            
            // 复制功能
            copyButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const textToCopy = contactValue.textContent.replace('复制', '').trim();
                
                // 创建临时输入框
                const tempInput = document.createElement('input');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                // 显示复制成功提示
                const originalIcon = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.color = '#2ecc71';
                
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                    this.style.color = '#6e8efb';
                }, 2000);
            });
        });
    };
    
    // 执行初始化函数
    initFormValidation();
    initGoogleMap();
    initSocialIconsHover();
    initCopyContactInfo();
});