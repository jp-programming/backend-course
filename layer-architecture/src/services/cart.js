const MongoCart = require('../DB/MongoCartContainer');
const { sendCheckoutEmail } = require('../lib/mailer');
const { sendWSMessage, sendTextMessage } = require('../lib/textMessage');

const cart = new MongoCart();

const doCheckout = async ({ email, name, phone }) => {
    const dbCart = await cart.getAll(email);
    
    if(dbCart.products.length) {
        const info = {
            name: name,
            email: email,
            products: dbCart.products,
            total: dbCart.total
        };
    
        sendCheckoutEmail(info);
        sendWSMessage(info);
        sendTextMessage(phone);

        await cart.clearCart(email);
        return true;
    }

    return false;
};

module.exports = doCheckout;