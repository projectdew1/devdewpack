

export const LANGUAGES = [
    {
        lang: 'en',
        label: 'English',
    },
    {
        lang: 'th',
        label: 'ภาษาไทย',
    },
];
//'text':'text',
const TRANSLATIONS = {
    'Edit blocks': 'แก้ไขบล็อค',
    'Add blocks': 'เพิ่มบล็อค',
    'Move blocks': 'ย้ายบล็อค',
    'Resize blocks': 'ปรับขนาดบล็อก',
    'Preview blocks': 'ดูตัวอย่างบล็อก',
    'Preview page': 'หน้าตัวอย่าง',
    'Search for blocks': 'ค้นหาบล็อก',
    'Add blocks to page': 'เพิ่มบล็อคให้กับเพจ',
    'Close': 'ปิด',
    'English (default).': 'อังกฤษ (ค่าเริ่มต้น)',
    'Text': 'ข้อความ',
    'Write here...': 'เขียนข้อความ...',
    'An advanced rich text area.': 'จัดรูปแบบขั้นสูง',
    'Image': 'รูปภาพ',
    'Loads an image from an url.': 'โหลดรูปภาพจาก url',
};

export const uiTranslator = (label) => {
    if (TRANSLATIONS[label] !== undefined) {
        return TRANSLATIONS[label];
    }
    return `${label}(to translate)`;
};