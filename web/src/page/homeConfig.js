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
      title: '版本：0.7.3 20220128',
      content: [
        '为支持新功能执行，程序已使用64位，不再支持32位系统',
        '新增内存读取玩家列表的功能，该功能为可选项，使用该功能后可以识别出修改名字的石锤玩家（由墨水大佬制作）',
        '新增了QQ机器人不返回信息的功能，主要为了避免QQ机器人被腾讯冻结或封号，启用该设置后，QQ机器人不再返回结果，但依旧会执行指令',
        '修复了快速设置服务器名称时，“&gt;”无法正常显示的bug',
        '快速设置时，在[BFV ROBOT]后缀后面第一个字符为空格的服务器不再会显示',
      ]
    },
    {
      title: '版本：0.7.0 20220121',
      content: [
        '新增了服务端，早期版本服务端仅支持客户端的验证功能，用于测试服务端连接稳定性',
        '新增了KPM的限制，现在可以在防暴力挂中设置KPM限制了',
        '重做了程序的验证方式，新的验证方式允许服主更换服务器名称了（新的验证方式为绑定开服账号的数字ID），当前仍会保留老的验证方式',
        '击杀限制当前最高限制200，等级限制中的最高等级现最高限制300级，超出该值后，限制功能会失效'
      ]
    },
    {
      title: '版本：0.6.10 20220104',
      content: [
        '现在可以使用gametools的api来获取房间内的玩家列表',
        '现在联Ban离线数据库不再提示更新了，改为自动更新了，以确保数据保持最新'
      ]
    },
    {
      title: '0.4.0 20211123 公开测试版本',
      content: [
        '增加了本地数据检测，包括联Ban的离线数据和本地检测的数据',
        '增加了禁用难以识别名称的功能，如O 0 o i l I组成的名称',
        '重做数据检测的权重，从高到低分别为现改为公用黑名单、本地黑名单、联Ban数据、本地白名单、公用白名单、本地检测数据，按顺序在其中一项中匹配到对应数据后会按照名单内设置的方式进行处理（直接ban掉或跳过检测），全部匹配不到会重新获取对应玩家的数据再进行检测',
        '增加了武器命中率检测（将原有武器设置中的警告值和禁止值改为命中率和爆头率）',
        '增加了自动关机功能',
        '增加了对识别到的玩家名称数据筛选功能，减少检测数量',
        '增加了对暴力挂的识别功能'
      ]
    },
    {
      title: '0.4.0 20211123 公开测试版本',
      content: [
        '新增了自动更新功能',
        '服务器名称现在可以设置了',
        '新增了程序使用权限管理的功能，只有通过验证的用户才可使用程序（内测服主已添加）',
        '自动踢人功能现在可以设置重试间隔时间和重试次数了'
      ]
    },
    {
      title: '版本：0.3.2 20211121 内部测试版本',
      content: [
        '新增了联Ban的数据进行外挂检测'
      ]
    },
    {
      title: '版本：0.2.0 20211110 内部测试版本',
      content: [
        '对UI进行了优化，方便使用者使用',
        '新增了参数设置，关于程序的设置可以在参数设置中进行调整（早期版本仅开放部分）',
        '增加了日志功能，在根目录下找到log文件，可以发送至作者分析程序BUG'
      ]
    }
    
  ]
}