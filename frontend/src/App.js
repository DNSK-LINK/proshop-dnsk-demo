import { Container } from 'react-bootstrap'
import { Routes, Route, HashRouter } from "react-router-dom";

import Header from './components/header'
import Footer from './components/footer'
import HomeScreen from './screens/homeScreen';
import ProductScreen from './screens/productScreen';
import CartScreen from './screens/cartScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import UserDetailsScreen from './screens/userDetailsScreen';
import ShippingScreen from './screens/shippingScreen';
import PaymentScreen from './screens/paymentScreen';
import PlaceOrderScreen from './screens/placeOrderScreen';
import OrderScreen from './screens/orderScreen';
import UserListScreen from './screens/userListScreen';
import UserEditScreen from './screens/userEditScreen';
import ProductListScreen from './screens/productListScreen';
import ProductEditScreen from './screens/productEditScreen';
import OrderListScreen from './screens/orderListScreen';

function App() {
    return (
        <HashRouter>
            <Header />
            <main className='py-5'>
                <Container>
                <Routes>
                    {" "}
                    <Route path="/" element={<HomeScreen />} />

                    <Route path="/login/" element={<LoginScreen />} />
                    <Route path="/register/" element={<RegisterScreen />} />
                    <Route path="/profile" element={<UserDetailsScreen />} />
                    <Route path="/admin/userlist" element={<UserListScreen />} />
                    <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
                    
                    <Route path="/product/:id" element={<ProductScreen />} />
                    <Route path="/cart/:id?" element={<CartScreen />} />
                    <Route path="/shipping" element={<ShippingScreen />} />
                    <Route path="/payment" element={<PaymentScreen />} />
                    <Route path="/placeorder" element={<PlaceOrderScreen />} />
                    <Route path="/order/:id?" element={<OrderScreen />} />
                    <Route path="/admin/orderslist/" element={<OrderListScreen />} />

                    <Route path="/admin/productlist" element={<ProductListScreen />} />
                    <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                    
                </Routes>
                </Container> 
            </main>
            <Footer />  
        </HashRouter>
    );
}

export default App;
