package com.aiztone.hulk.spider.processor;

import com.aiztone.hulk.spider.HulkSpider;
import us.codecraft.webmagic.processor.PageProcessor;

/**
 * Created by lenn on 16/7/29.
 */
public class PageProcessorFactory {

    // 静态工厂方法
    public static PageProcessor getPageProcessor(String host){
        if(host == null || host.equals("")){
            throw new IllegalArgumentException("host is empty.");
        }

        if(host.equals(HulkSpider.BAIDUVR_HOST)){
            return new BaiduVrPageProcessor();
        }else if(host.equals(HulkSpider.CSDNVR_HOST)){
            return new CsdnVrPageProcessor();
        }else if(host.equals(HulkSpider.LEIPHONE_HOST)){
            return new LeiphonePageProcessor();
        }else if(host.equals(HulkSpider.MODUOVR_HOST)){
            return new ModuoVrPageProcessor();
        }else if(host.equals(HulkSpider.TMTPOST_HOST)){
            return new TmtpostPageProcessor();
        }else if(host.equals(HulkSpider.YIVIAN_HOST)){
            return new YivianPageProcessor();
        }else if(host.equals(HulkSpider.VRZY_HOST)){
            return new VrzyPageProcessor();
        }

        return null;
    }
}
