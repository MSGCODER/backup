package com.aiztone.hulk.spider.cleaner.definition;

/**
 * Created by lenn on 16/8/1.
 */
public class ModuoVrCleanDefinition extends HulkUrlCleanDefinition {
    private String[] regex = {"http://www\\.moduovr\\.com/article/.+\\.html#?"};

    @Override
    public String[] getRegex() {
        return regex;
    }
}
