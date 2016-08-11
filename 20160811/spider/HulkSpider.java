package com.aiztone.hulk.spider;

import us.codecraft.webmagic.Spider;

import java.util.Map;

/**
 * Created by lenn on 16/7/29.
 */
public class HulkSpider {

    // 百度VR
    public static final String BAIDUVR_HOST = "ivr.baidu.com";

    // CSDN VR
    public static final String CSDNVR_HOST = "lib.csdn.net";

    // 雷锋网
    public static final String LEIPHONE_HOST = "www.leiphone.com";

    // 魔多VR
    public static final String MODUOVR_HOST = "www.moduovr.com";

    // 钛媒体
    public static final String TMTPOST_HOST = "www.tmtpost.com";

    // Yivian
    public static final String YIVIAN_HOST = "yivian.com";

    // VR资源网
    public static final String VRZY_HOST = "www.vrzy.com";

    // 爬取列表
    public static final String[] FETCH_LIST = {
            // BAIDUVR_HOST,
            CSDNVR_HOST,
            // LEIPHONE_HOST,
            // MODUOVR_HOST,
            // TMTPOST_HOST,
            // YIVIAN_HOST,
            // VRZY_HOST
    };

    // URL CLEAN 列表
    public static final String[] CLEAN_LIST = {
            // BAIDUVR_HOST,
            CSDNVR_HOST,
            // LEIPHONE_HOST,
            // MODUOVR_HOST,
            // TMTPOST_HOST,
            // VRZY_HOST,
            //YIVIAN_HOST
    };

    public static final int threadNum = 1;

    public HulkSpider() {
    }
}
