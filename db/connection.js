import mongoose from 'mongoose';

async function connection(){

    return await mongoose.connect('mongodb+srv://phalakgirish:ZXctorZnK889zdF6@cluster0.gml47kx.mongodb.net/tshirtprint')

}

export default connection;