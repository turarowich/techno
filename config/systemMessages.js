const en_messages = {
    // Order messages
    order_updated: 'Order edit',
    order_changed: 'Order changed',
    order_deleted: 'Order deleted',
    orders_deleted: 'Orders deleted',
    order_by: 'Order by',
    canceled: 'Canceled',
    done: 'Done',
    inprogress: 'In progress',

    change_status: 'Change status',
    change_status: 'Change status',
    change_status: 'Change status',
    
    
}
const ru_messages = {
    // ERROR messages
    name_required: 'Имя обязательно',
    name_min: 'Имя слишком короткое',
    name_max: 'Имя слишком длинное',
    email_required: 'Требуется электронная почта',
    email_unique: "Указанный адрес электронной почты уже используется.",
    email_valid: "Пожалуйста, заполните действующий адрес электронной почты",
    phone_required: 'Требуется телефон',
    phone_unique: "Указанный номер телефона уже используется.",
    phone_valid: "Пожалуйста, введите действующий номер телефона",
    phone_min: 'Номер телефона слишком короткий',
    phone_max: 'Номер телефона слишком длинный',
    password_required: 'Требуется пароль',
    password_min: 'Пароль слишком короткий',
    password_max: 'Пароль слишком длинный',
    password_valid: "Пожалуйста, введите действующий пароль",
    user_not_found: 'Пользователь не найден',
    user_exist: 'Пользователь уже существует',
    password_wrong: 'Неверный пароль',
    client_user_exist_title: 'Пользователь уже зарегистрирован',
    client_user_exist_msg: 'Возможно вы уже зарегистрировались ранее, попробуйте авторизоватся',
    client_user_not_found_title: 'Пользователь не найден',
    client_user_not_found_msg: 'Возможно вы ещё не зарегистрировались',
    image_not_valid: 'Неправильный формат изображения',
    company_name_required: 'Название компании обязательное поле',
    logo_required: 'Лого обязательное поле',
    slogan_required: 'Слоган обязательное поле',
    currency_required: 'Валюта обязательное поле',
    type_required: 'Тип обязателен',
    birthday_required: 'День рождения обязательное поле',
    code_required: 'Кодовое слово обязательное поле',
    comment_required: 'Коментарий обязательное поле',
    description_required: 'Описание обязательное поле',
    code_invalid: 'Неравильный код',
    code_unique: 'Не уникальный код',

    // EXCEL messages
    xl_produt_name: 'Название',
    xl_produt_name_ru: "Название ru",
    xl_produt_price: 'Цена',
    xl_product_quantity: 'Колличество',
    xl_product_result: 'Итого',
    xl_client_name: 'Имя Клиента',
    xl_client_phone: 'Телефон',
    xl_created_at: 'Дата заказа',
    xl_order_notes: 'Заметки',
    xl_order_status: 'Статус',
    xl_category_name: 'Категория',
    xl_product_vendorcode: 'Артикул',
    xl_promo_name: 'Промокод',
    xl_promo_price: 'Скидка промодка',
    xl_promo_start: 'Дата начало промокода',
    xl_promo_end: 'Дата конца промокода',
    xl_recommend: 'Рекомендовано',
    //Promocode
    promo_code:'Код должен быть минимум 12 сиволов',
    promo_name_unique:'Промокод с таким названием уже существует',
    promo_code_unique: 'Промокод с таким кодом уже существует',
    promo_404: 'Промокод не найден',
    promo_not_usable: 'Промокод не может быть использован',
    promo_min_price: 'Не достигнута сумма для использования промокода',
    
    
}
module.exports = {
    en: en_messages,
    ru: ru_messages
};