package com.aiztone.hulk.spider.cleaner.definition;

/**
 * Created by lenn on 16/8/1.
 */
public class LeiphoneCleanDefinition extends HulkUrlCleanDefinition {
    private static String[] regex = {"http://www\\.leiphone\\.com/news/\\d{6}/.+\\.html#?"};

    @Override
    public String[] getRegex() {
        return regex;
    }
}
