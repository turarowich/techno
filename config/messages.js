const en_messages = {
    // ERROR messages
    name_required: 'Name required',
    name_min: 'Name is too short',
    name_max: 'Name is too long',
    email_required: 'Email required',
    email_unique: "The specified email address is already in use.",
    email_valid: "Please fill a valid email address",
    phone_required: 'Phone required',
    phone_unique: "The specified phone number is already in use.",
    phone_valid: "Please fill a valid phone number",
    phone_min: 'Phone number is too short',
    phone_max: 'Phone number is too long',
    password_required: 'Password required',
    password_min: 'Password is too short',
    password_max: 'Password is too long',
    password_valid: "Please fill a valid password",
    user_not_found: 'User not found',
    user_exist: 'User already exist',
    password_wrong: 'Wrong password',
    client_user_exist_title: 'User already signed in',
    client_user_exist_msg: 'Probably u have been signed in already, try to authenticate',
    client_user_not_found_title: 'User not found',
    client_user_not_found_msg: 'Probably u didnt sign up',
    image_not_valid: 'Not valid image format',
    company_name_required: 'Company name required',
    logo_required: 'Logo required',
    slogan_required: 'Slogan required',
    currency_required: 'Currency required',
    type_required: 'Type required',
    birthday_required: 'Birthday required',
    code_required: 'Code required',
    comment_required: 'Comment required',
    description_required: 'Description required',

    // EXCEL messages
    xl_produt_name:'Product name',
    xl_produt_name_ru: "Product name ru",
    xl_produt_price: 'Product price',
    xl_product_quantity: 'Product quantity',
    xl_client_name: 'Client name',
    xl_client_phone: 'Client phone',
    xl_created_at: 'Created at',
    xl_order_notes: 'Order notes',
    xl_order_status: 'Order status',
    xl_product_result: 'Result',
    xl_category_name: 'Category',
    xl_product_vendorcode: 'Vendorcode',
    xl_promo_name: 'Promocde',
    xl_promo_price: 'Promocode discount',
    xl_promo_start: 'Promocode start date',
    xl_promo_end: 'Promocode end date',
    xl_recommend: 'Recommended',
    xl_product_result: 'Result',
    //Promocode
    promo_code:'Code has to be at least 12 characters',
    promo_name_unique:'Promocode with this name already exists',
    promo_code_unique: 'Promocode with this code already exists',
    promo_404: 'Promocode not found',
    promo_not_usable: 'Promocode is not usable',
    promo_min_price: 'The amount for using the promo code has not been reached',
    
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