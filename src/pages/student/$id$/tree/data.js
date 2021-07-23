/**
 * author : yangbo
 * date : 2021/07/16 16:03:26
 * fileName: data.js
 * description : 
**/

export const propData = [
    {
        "componentId": "hjoZoWY0qdbNGCW9E6EnlcAEWZ8N1m2s",
        "componentName": "矩形1",
        "componentType": "2110",
    },
    {
        "componentId": "Dt9abFMXW3qzUu8aRoIF0wczCwhhRygb",
        "componentType": "5001",
        "componentName": "组合1",
        "groupModel": {
            "groupList": [
                {
                    "componentId": "dTuLeDoY7NK6bpi6Aktgp7IQkO0oWy21",
                    "componentName": "动态面板1",
                    "componentType": "4901",
                    "dynamicModel": {
                        "pageList": [
                            {
                                "pageId": "THTvd2xjXc8sf6MLiUXD4KDYo46Ig2Z8",
                                "pageName": "页一",
                                "pageOrder": 0,
                                "componentList": [
                                    {
                                        "componentId": "4UyEvfXUoexXitypMBR7CTsKtLHR9A4S",
                                        "componentName": "组合2",
                                        "componentType": "5001",
                                        "groupModel": {
                                            "groupList": [
                                                {
                                                    "componentId": "hdHvdiIfYI8oWM7hB1gLhDKuTu8HijZV",
                                                    "componentName": "矩形2",
                                                    "componentType": "2110",
                                                },
                                                {
                                                    "componentId": "YjVFhjyvgeilTzCZm0nAgtUcb2z4ay8I",
                                                    "componentName": "圆形2",
                                                    "componentType": "2112",
                                                }
                                            ]
                                        },
                                    },
                                    {
                                        "componentId": "hdHvdiIfYI8oWM7hB25LhDKuTu8HijZV",
                                        "componentName": "矩形3",
                                        "componentType": "2110",
                                    },
                                ]
                            },
                            {
                                "pageId": "QDXmW4BniKC4xgsuK4HDM04Yr8M7aTkj",
                                "pageName": "页一副本",
                                "pageOrder": 1,
                                "componentList": [
                                    {
                                        "componentId": "bxlWkf1bguluNKK7NRVzdUCXT0pBPC6j",
                                        "componentName": "组合3",
                                        "componentType": "5001",
                                        "groupModel": {
                                            "groupList": [
                                                {
                                                    "componentId": "hdHvdiIfYI8oWM7hB1gLhDKuTu8HijcV",
                                                    "componentName": "矩形4",
                                                    "componentType": "2110",
                                                },
                                                {
                                                    "componentId": "YjVFhjyvgeilTzCZm0nAgtUcb2z4as8I",
                                                    "componentName": "圆形4",
                                                    "componentType": "2112",
                                                }
                                            ]
                                        },
                                    }
                                ]
                            }
                        ]
                    },
                },
                {
                    "componentId": "qfAPamdhhkJ0jmL87C3RIybRR73skzm8",
                    "componentName": "矩形5",
                    "componentType": "2110",
                }
            ]
        },
    }
]

export const checkedData = {
    eventName: "123",
    eventId: "3Sa4G9ExaujfZjQZjWcQ2DYko6tpKYYO",
    triggerCondition: "40101",
    triggerId: "iTNaB9FNH3NZfIvsywtZIQqu7QUaKCMg",
    tab: "blank",
    replaceVars: [],
    realizeMovement: "40004",
    linkUrl: [
        {
            chainId: "Dt9abFMXW3qzUu8aRoIF0wczCwhhRygb",
            chainType: "2D",
            chainPage: "",
            // chainNext: null,
            chainNext: [
                {
                    chainId: "dTuLeDoY7NK6bpi6Aktgp7IQkO0oWy21",
                    chainType: "2D",
                    chainPage: "",
                    // chainNext: null,
                    chainNext: [
                        {
                            chainId: "4UyEvfXUoexXitypMBR7CTsKtLHR9A4S",
                            chainType: "2D",
                            chainPage: "THTvd2xjXc8sf6MLiUXD4KDYo46Ig2Z8",
                            // chainNext: null,
                            chainNext: [
                                {
                                    chainId: "YjVFhjyvgeilTzCZm0nAgtUcb2z4ay8I",
                                    chainType: "2D",
                                    chainPage: "",
                                    chainNext: null
                                },
                                {
                                    chainId: "hdHvdiIfYI8oWM7hB1gLhDKuTu8HijZV",
                                    chainType: "2D",
                                    chainPage: "",
                                    chainNext: null
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            chainId: "hjoZoWY0qdbNGCW9E6EnlcAEWZ8N1m2s",
            chainType: "2D",
            chainPage: "",
            chainNext: null,
        },
    ],
    scenesId: "9bf28f4a2b8f4f8493775144800d627d",
    pageId: "5910fffc4be04da893dcbae7d7d32e49",
    animateType: "1000",
    receiveType: 1014,
    switchData: 0,
    continueTime: 1000,
    subInteraction: []
}


