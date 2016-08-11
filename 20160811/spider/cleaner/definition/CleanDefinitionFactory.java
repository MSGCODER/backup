package com.aiztone.hulk.spider.cleaner.definition;

import com.aiztone.hulk.spider.HulkSpider;

/**
 * Created by lenn on 16/8/2.
 */
public class CleanDefinitionFactory {
    /**
     * 获取URL清除定义
     * @param host
     * @return
     */
    public static HulkUrlCleanDefinition getUrlCleanDefinition(String host){
        if(host == null || host.equals("")){
            throw new IllegalArgumentException("host is empty.");
        }

        if(host.equals(HulkSpider.BAIDUVR_HOST)){
            return new BaiduVrCleanDefinition();
        }else if(host.equals(HulkSpider.CSDNVR_HOST)){
            return null;
        }else if(host.equals(HulkSpider.LEIPHONE_HOST)){
            return new LeiphoneCleanDefinition();
        }else if(host.equals(HulkSpider.MODUOVR_HOST)){
            return new ModuoVrCleanDefinition();
        }else if(host.equals(HulkSpider.TMTPOST_HOST)){
            return new TmtpostCleanDefinition();
        }else if(host.equals(HulkSpider.YIVIAN_HOST)){
            return new YivianCleanDefinition();
        }else if(host.equals(HulkSpider.VRZY_HOST)){
            return new VrzyCleanDefinition();
        }

        return null;
    }
}
