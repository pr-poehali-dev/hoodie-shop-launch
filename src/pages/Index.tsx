import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  size?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products: Product[] = [
    {
      id: 1,
      name: 'Стильная толстовка',
      price: 3990,
      image: '/img/9d020751-e46c-4dab-85ca-25fc8ba531ab.jpg',
      category: 'hoodie'
    },
    {
      id: 2,
      name: 'Классическая футболка',
      price: 1590,
      image: '/img/140d2968-85d1-427e-9c87-c554033fab58.jpg',
      category: 'tshirt'
    },
    {
      id: 3,
      name: 'Уютный свитшот',
      price: 2990,
      image: '/img/9d020751-e46c-4dab-85ca-25fc8ba531ab.jpg',
      category: 'sweatshirt'
    },
    {
      id: 4,
      name: 'Модная сумка',
      price: 2490,
      image: '/img/fe33dbc7-83dc-4d1e-8d4b-f729c11657fb.jpg',
      category: 'bag'
    },
    {
      id: 5,
      name: 'Винтажная футболка',
      price: 1790,
      image: '/img/140d2968-85d1-427e-9c87-c554033fab58.jpg',
      category: 'tshirt'
    },
    {
      id: 6,
      name: 'Спортивная толстовка',
      price: 4490,
      image: '/img/9d020751-e46c-4dab-85ca-25fc8ba531ab.jpg',
      category: 'hoodie'
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const navigation = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'catalog', label: 'Каталог', icon: 'Grid3x3' },
    { id: 'sizes', label: 'Размеры', icon: 'Ruler' },
    { id: 'delivery', label: 'Доставка', icon: 'Truck' },
    { id: 'contacts', label: 'Контакты', icon: 'Phone' }
  ];

  const renderHome = () => (
    <div className="space-y-16">
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-coral/20 via-mint/20 to-navy/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-coral/10 to-mint/10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-navy mb-6 animate-fade-in">
            FASHION STORE
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in">
            Стильная одежда для современных людей
          </p>
          <Button 
            size="lg" 
            className="bg-coral hover:bg-coral/90 text-white px-8 py-4 text-lg animate-scale-in"
            onClick={() => setActiveSection('catalog')}
          >
            Смотреть каталог
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-navy mb-12">
            Популярные товары
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 animate-fade-in border-0 shadow-lg">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-coral text-white">
                    Хит
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-navy mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-coral">{product.price.toLocaleString()} ₽</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full bg-mint hover:bg-mint/90 text-white"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={16} />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderCatalog = () => (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-navy mb-12">
          Каталог товаров
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 animate-fade-in border-0 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-navy mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-coral">{product.price.toLocaleString()} ₽</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full bg-mint hover:bg-mint/90 text-white"
                  onClick={() => addToCart(product)}
                >
                  <Icon name="ShoppingCart" className="mr-2" size={16} />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSizes = () => (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-navy mb-12">
          Таблица размеров
        </h2>
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-2 border-mint">
                    <th className="py-4 text-navy font-semibold">Размер</th>
                    <th className="py-4 text-navy font-semibold">Грудь (см)</th>
                    <th className="py-4 text-navy font-semibold">Талия (см)</th>
                    <th className="py-4 text-navy font-semibold">Длина (см)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-medium">XS</td>
                    <td className="py-4">88-92</td>
                    <td className="py-4">68-72</td>
                    <td className="py-4">65</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-medium">S</td>
                    <td className="py-4">92-96</td>
                    <td className="py-4">72-76</td>
                    <td className="py-4">67</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-medium">M</td>
                    <td className="py-4">96-100</td>
                    <td className="py-4">76-80</td>
                    <td className="py-4">69</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-medium">L</td>
                    <td className="py-4">100-104</td>
                    <td className="py-4">80-84</td>
                    <td className="py-4">71</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">XL</td>
                    <td className="py-4">104-108</td>
                    <td className="py-4">84-88</td>
                    <td className="py-4">73</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDelivery = () => (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-navy mb-12">
          Доставка и оплата
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <Icon name="Truck" className="text-coral mb-4" size={48} />
              <h3 className="text-2xl font-semibold text-navy mb-4">Доставка</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Бесплатная доставка от 3000 ₽</li>
                <li>• Курьерская доставка: 300 ₽</li>
                <li>• Самовывоз: бесплатно</li>
                <li>• Доставка 1-3 рабочих дня</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <Icon name="CreditCard" className="text-mint mb-4" size={48} />
              <h3 className="text-2xl font-semibold text-navy mb-4">Оплата</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Банковские карты</li>
                <li>• Электронные кошельки</li>
                <li>• Наличными курьеру</li>
                <li>• Безналичный расчет</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-navy mb-12">
          Контакты
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-navy mb-6">Свяжитесь с нами</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Icon name="Phone" className="text-coral mr-4" size={24} />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-gray-600">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" className="text-mint mr-4" size={24} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@fashionstore.ru</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon name="MapPin" className="text-navy mr-4" size={24} />
                  <div>
                    <p className="font-medium">Адрес</p>
                    <p className="text-gray-600">Москва, ул. Модная, д. 123</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" className="text-coral mr-4" size={24} />
                  <div>
                    <p className="font-medium">Время работы</p>
                    <p className="text-gray-600">Пн-Вс: 10:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-navy mb-6">Социальные сети</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Instagram" className="mr-3" size={20} />
                  @fashionstore
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="MessageCircle" className="mr-3" size={20} />
                  Telegram
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Facebook" className="mr-3" size={20} />
                  Fashion Store
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'home': return renderHome();
      case 'catalog': return renderCatalog();
      case 'sizes': return renderSizes();
      case 'delivery': return renderDelivery();
      case 'contacts': return renderContacts();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-navy cursor-pointer" onClick={() => setActiveSection('home')}>
                FASHION STORE
              </h1>
              <nav className="hidden md:flex space-x-6">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'text-coral bg-coral/10'
                        : 'text-gray-600 hover:text-coral'
                    }`}
                  >
                    <Icon name={item.icon as any} size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-coral text-white text-xs">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="animate-slide-in-right">
                  <SheetHeader>
                    <SheetTitle className="text-navy">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="py-6">
                    {cart.length === 0 ? (
                      <p className="text-gray-500 text-center">Корзина пуста</p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                              <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-coral font-semibold">{item.price.toLocaleString()} ₽</p>
                                <p className="text-xs text-gray-500">Количество: {item.quantity}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-xl font-bold text-coral">{getTotalPrice().toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full bg-coral hover:bg-coral/90 text-white">
                            Оформить заказ
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {renderContent()}
      </main>

      <footer className="bg-navy text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FASHION STORE</h3>
              <p className="text-gray-300">Стильная одежда для современных людей</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-white transition-colors">Каталог</button></li>
                <li><button onClick={() => setActiveSection('sizes')} className="hover:text-white transition-colors">Размеры</button></li>
                <li><button onClick={() => setActiveSection('delivery')} className="hover:text-white transition-colors">Доставка</button></li>
                <li><button onClick={() => setActiveSection('contacts')} className="hover:text-white transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-300">
                <p>+7 (999) 123-45-67</p>
                <p>info@fashionstore.ru</p>
                <p>Москва, ул. Модная, д. 123</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fashion Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;