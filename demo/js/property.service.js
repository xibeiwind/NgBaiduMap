(function () {
    'use strict';

    angular
        .module('app.gis')
        .service('PropertyService', function ($q) {

            var self = this;
            self.propertyList = [];
            self.propertyList["familymart"] = [
                {

                    point: {
                        "lng": 121.50691518,
                        "lat": 31.22944490
                    },
                    "brand": "familymart",
                    "propertyId": "SH14000917",
                    "status": "S",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "2266",
                    "storeName": "老太平弄店"

                },
                {

                    point: {
                        "lng": 121.49319623,
                        "lat": 31.22213514
                    },
                    "brand": "familymart", "propertyId": "SH13000389",
                    "status": "S",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "2027",
                    "storeName": "中华路二店"

                },
                {

                    point: {
                        "lng": 121.47405270,
                        "lat": 31.21065748
                    },
                    "brand": "familymart", "propertyId": "SH16001349",
                    "status": "S",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "2692",
                    "storeName": "瑞金南路二店"

                },
                {

                    point: {
                        "lng": 121.47971347,
                        "lat": 31.24334408
                    },
                    "brand": "familymart", "propertyId": "SHHP002360",
                    "status": "S",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "1096",
                    "storeName": "新金桥广场店"

                },
                {

                    point: {
                        "lng": 121.48185380,
                        "lat": 31.24292449
                    },
                    "brand": "familymart", "propertyId": "SHHP002497",
                    "status": "S",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "1265",
                    "storeName": "牛庄路店"

                },
                {

                    point: {
                        "lng": 121.47613728,
                        "lat": 31.23308204
                    },
                    "brand": "familymart", "propertyId": "SH11000050",
                    "status": "S",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "1796",
                    "storeName": "重庆北路店"

                },
                {

                    point: {
                        "lng": 121.48812800,
                        "lat": 31.23671987
                    },
                    "brand": "familymart", "propertyId": "SH13000515",
                    "status": "S",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "2047",
                    "storeName": "延安东路二店"

                },
                {

                    point: {
                        "lng": 121.48573233,
                        "lat": 31.23238643
                    },
                    "brand": "familymart", "propertyId": "SH15000264",
                    "status": "S",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "2412",
                    "storeName": "大世界站二店"

                },
                {

                    point: {
                        "lng": 121.49552202,
                        "lat": 31.20933576
                    },
                    "brand": "familymart", "propertyId": "SHHP005132",
                    "status": "S",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "1757",
                    "storeName": "西藏南路六店"

                },
                {

                    point: {
                        "lng": 121.46681078,
                        "lat": 30.91606650
                    },
                    "brand": "familymart", "propertyId": "SH12000211",
                    "status": "C",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "1897",
                    "storeName": "人民路店"

                },
                {

                    point: {
                        "lng": 121.47915172,
                        "lat": 31.24014489
                    },
                    "brand": "familymart", "propertyId": "SH16000983",
                    "status": "B",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "2401",
                    "storeName": "南京西路六店"

                },
                {

                    point: {
                        "lng": 121.48761051,
                        "lat": 31.23446570
                    },
                    "brand": "familymart", "propertyId": "SH12000115",
                    "status": "A",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "1899",
                    "storeName": "宁海东路店"

                },
                {

                    point: {
                        "lng": 121.49344700,
                        "lat": 31.23810987
                    },
                    "brand": "familymart", "propertyId": "SHHP002450",
                    "status": "H",
                    "companyName": "上海福满家便利有限公司",
                    "snId": "1211",
                    "storeName": "河南中路二店"

                }];

            // self.propertyList["lowson"] = [
            //     {}
            // ];


            this.queryPropertyList = function (queryOptions) {
                var defer = $q.defer();

                //if (AuthService.isLogined()) {

                defer.resolve(self.propertyList);
                //}

                return defer.promise;
            }

        })



}());