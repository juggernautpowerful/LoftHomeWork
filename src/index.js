let placemarkers = [
        {
            latitude: 59.97,
            longitude: 30.31,
            
            balloonContentHeader: '<div class="container-header color-form">Метка №</div>',
            balloonContentBody: '<div class="container-reviews"></div>',
            balloonContentFooter: 
                [
                    '<div class="container-form">',
                    '<p class="header-form">Ваш отзыв</p>',
                    '<input type="text" placeholder="Ваше имя" name="firstName">',
                    '<input type="text" placeholder="Укажите место" name="place">',
                    '<textarea rows="4" type="text" placeholder="Поделитесь впечатлениями" name="impressions" >',
                    '</textarea>',
                    '<button class="addBtn color-form">Добавить</button>',
                    '</div>',
                    '</div>'
                ]
        },
        
        {
            latitude: 59.94,
            longitude: 30.25,
            
            balloonContentHeader: '<div class="container-header color-form">Метка №</div>',
            balloonContentBody: '<div class="container-reviews"></div>',
            balloonContentFooter: 
                [
                    '<div class="container-form">',
                    '<p class="header-form">Ваш отзыв</p>',
                    '<input type="text" placeholder="Ваше имя" name="firstName">',
                    '<input type="text" placeholder="Укажите место" name="place">',
                    '<textarea rows="4" type="text" placeholder="Поделитесь впечатлениями" name="impressions" >',
                    '</textarea>',
                    '<button class="addBtn color-form">Добавить</button>',
                    '</div>',
                    '</div>'
                ]
        }
    ], 
    geoObjects = []
    
ymaps.ready(init);

function init() {
    let map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 9
    }, {
        balloonCloseButton: false,
        searchControlProvider: 'yandex#search'
    });

    for (let i = 0; i < placemarkers.length; i++) {
        let placemark = new ymaps.Placemark([placemarkers[i].latitude, placemarkers[i].longitude], {
            balloonContentHeader: placemarkers[i].balloonContentHeader,
            balloonContentBody: placemarkers[i].balloonContentBody,
            balloonContentFooter: placemarkers[i].balloonContentFooter
        }
        // , {
        //     preset: 'islands#blackStretchyIcon'
        // }
        );

        geoObjects.push(placemark);
    }

    let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
        // '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
        '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>'
        //   + '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );
    let clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Устанавливаем стандартный макет балуна кластера "Карусель".
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        // Устанавливаем собственный макет.
        clusterBalloonItemContentLayout: customItemContentLayout,
        // Устанавливаем режим открытия балуна. 
        // В данном примере балун никогда не будет открываться в режиме панели.
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 160,
        // Устанавливаем максимальное количество элементов в нижней панели на одной странице
        clusterBalloonPagerSize: 15
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);

    map.events.add('click', function (e) {
        if (!map.balloon.isOpen()) {
            let coords = e.get('coords');

            getAddress(coords, a =>

                map.balloon.open(coords, {
                    contentHeader: '<div class="container-header color-form">' + a + '</div>',
                    contentBody: '<div class="container-reviews"><p>Отзывов пока нет..</p></div>',
                    contentFooter: [
                        '<div class="container-form">',
                        '<p class="header-form">Ваш отзыв</p>',
                        '<input type="text" placeholder="Ваше имя" name="firstName">',
                        '<input type="text" placeholder="Укажите место" name="place">',
                        '<textarea rows="4" type="text" placeholder="Поделитесь впечатлениями" name="impressions" >',
                        '</textarea>',
                        '<button class="addBtn color-form">Добавить</button>',
                        '</div>',
                        '</div>'
                    ]
                }).then(()=> {
                    let btnEl = document.querySelector('.addBtn');
        
                    btnEl.addEventListener('click', ()=>{
                        // console.log('click')
                        let nameEl = document.querySelector('input[name="firstName"]');
                        // let txtName = nameEl.value;
                        
                        // let parent = document.querySelector('.container-form');
                        // let elems = parent.getElementsByTagName('p');

                        // parent.removeChild(elems[0]);
                        // let div = document.createElement('div');

                        // div.innerHTML = txtName;
                        // parent.appendChild(div);
                        // map.properties.set({
                        //     contentBody: 'gg'
                        // })
                    });
                })
            )

        } else {
            map.balloon.close();
        }
    });

    function getAddress(coords, resolve) {
        ymaps.geocode(coords).then(res=> {
            let address = res.geoObjects.get(0)? res.geoObjects.get(0).getAddressLine() :
                'Не удалось определить адрес.';
            
            resolve(address);
        })
    }
}