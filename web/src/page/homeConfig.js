export default {
  notice: [],
  explain: [
    { title: '使用教程文字版', content: [{ link: 'https://docs.qq.com/doc/DVUViSVJ2WmFZdWFD', content: 'https://docs.qq.com/doc/DVUViSVJ2WmFZdWFD' }] },
    { title: '使用教程视频版', content: [{ link: 'https://www.bilibili.com/video/BV1vM4y1F7ZW/', content: 'https://www.bilibili.com/video/BV1vM4y1F7ZW/' }] },
    { title: 'BFV Robot 服务器规则限制', content: [{ link: 'https://docs.qq.com/doc/DVUpackF0eER1U1dw', content: 'https://docs.qq.com/doc/DVUpackF0eER1U1dw' }] },
    { title: '宣传视频', content: [
        { link: 'https://www.bilibili.com/video/BV1VY411a7Ff?from=search&seid=1556045184731218478&spm_id_from=333.337.0.0', content: 'bilibili 狙佬-zuener' },
        { link: 'https://www.bilibili.com/video/BV1Di4y1X7eR?spm_id_from=333.999.0.0', content: 'bilibili chang者' },
        { link: 'https://space.bilibili.com/11090572?from=search&seid=14340499687682547696&spm_id_from=333.337.0.0', content: 'bilibili 晚晚EnYuuka' }
      ] 
    }
  ],
  log: [
    {
      content: [
        '0.6.X版本不再添加新功能，仅作bug修复。', '0.7.X版本将会带来服务端、用户系统以及公用QQ机器人。'
      ]
    },
    {
      content: [
        '关于0.6.13的说明：远程开服功能（start=0是需要勾选24小时开服后才可使用，后期会独立出来），语言的切换在set.ini文件里，在[set]下面输一行lang=en就可以切换成英语了'
      ]
    },
    {
      title: '注意：0.6.8版本及以后需要做以下调整：',
      content: [
        '1.将设置中视频里面的亮度调整为0%', '2.tessdata文件夹下面新增了bfv.traineddata，无此文件程序将无法正常工作'
      ]
    },
    {
      title: '版本：0.6.13 20220112',
      content: [
        '1.新增了英语版本说明（控制台中部分内容尚未翻译，程序正常使用的部分已翻译完毕）',
        '2.修复了在得分板界面时会进入到玩家详细信息界面的bug（需要更新bfvkey.exe程序）',
        '3.修复了start=1无法正常调用自动进入观战位功能的bug',
        '4.修复了当停止程序后再重新启动程序时，因游戏时间未进行更新会错误导致玩家spm过高的bug',
        '5.修复了游戏崩溃后，QQ机器人会无限提示游戏崩溃的bug',
      ]
    },
    {
      title: '版本：0.6.12 20220107',
      content: [
        '1.现在使用close=0关闭战地5后，会暂时停止使用游戏崩溃后自动恢复和自动建服的功能，使用start=0会重新启用原有设置',
        '2.现自动进入观战位已改为房间人数16人以上时执行',
        '3.修复了当社区服名字错误时，程序仍能正常工作的bug',
        '4.修复了当等级或击杀识别错误时导致的误踢',
        '5.修复了自动进入观战时会失败的bug',
        '6.现在游戏里会提示服务器的一些规则设定了',
      ]
    },
    {
      title: '版本：0.6.11 20220104',
      content: [
        '1.调整了自动进入观战位的检测方式，已修复部分服主反馈无法正常进入观战位的bug',
        '2.现在可以使用QQ机器人来执行自动进入观战位的指令了（start=1）'
      ]
    },
    {
      title: '版本：0.6.10 20220104',
      content: [
        '1.现在可以使用gametools的api来获取房间内的玩家列表了（在参数设置里反外挂设置下使用api打钩）',
        '2.修复了恢复到观战位时可能会失败的bug',
        '3.修复了当程序一次性踢出多个玩家时，容易出现误踢的bug',
        '4.修复了当玩家处于白名单时，仍会被因为武器数据检查，被判为外挂玩家',
        '5.现在联Ban离线数据库不再提示更新了，改为自动更新了，以确保数据保持最新'
      ]
    },
    {
      title: '版本：0.6.10 20220104',
      content: [
        '1.现在可以使用gametools的api来获取房间内的玩家列表了（在参数设置里反外挂设置下使用api打钩）',
        '2.修复了恢复到观战位时可能会失败的bug',
        '3.修复了当程序一次性踢出多个玩家时，容易出现误踢的bug',
        '4.修复了当玩家处于白名单时，仍会被因为武器数据检查，被判为外挂玩家',
        '5.现在联Ban离线数据库不再提示更新了，改为自动更新了，以确保数据保持最新'
      ]
    },
  ]
}