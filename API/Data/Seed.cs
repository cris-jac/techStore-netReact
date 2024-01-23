using API.Models;
using API.Utilities;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public static class Seed
{
    public static async Task SeedData(
        StoreContext context, 
        UserManager<User> userManager
    )
    {
        if (!userManager.Users.Any())
        {
            var user = new User { UserName = "pepe", Email = "pepe@test.com" };

            await userManager.CreateAsync(user, "Password1!");
            await userManager.AddToRoleAsync(user, SD.Role_Customer);

            var admin = new User { UserName = "admin", Email = "admin@test.com" };

            await userManager.CreateAsync(admin, "Password2!");
            await userManager.AddToRolesAsync(admin, new[] { SD.Role_Customer, SD.Role_Admin } );
        }


        if (context.Products.Any()) return;

        List<Product> products = new List<Product>{
            new Product
            {
                Name = "Keychron Keyboard",
                Description = "Este teclado mecánico cuenta con un diseño elegante y moderno, con retroiluminación RGB personalizable y un diseño compacto perfecto tanto para jugadores como para mecanógrafos. Se conecta mediante USB-C o Bluetooth, lo que lo hace versátil para usar con múltiples dispositivos.",
                PriceInUSD = 60,
                PriceInARS = 49100.99,
                PictureUrl = "images/products/stefen-tan-KYw1eUx1J7Y-unsplash.jpg",
                Category = "Keyboard",
                Brand = "Keychron",
                QuantityInStock = 89
            },
            new Product
            {
                Name = "Wireless Apple Keyboard",
                Description = "Este teclado delgado y liviano está diseñado para emparejarse perfectamente con dispositivos Apple gracias a su tecnología Bluetooth incorporada. Cuenta con un diseño de tecla de perfil bajo y una batería recargable que dura hasta tres meses con una sola carga.",
                PriceInUSD = 69,
                PriceInARS = 56400.99,
                PictureUrl = "images/products/clay-banks-PXaQXThG1FY-unsplash.jpg",
                Category = "Keyboard",
                Brand = "Apple",
                QuantityInStock = 82
            },
            new Product
            {
                Name = "Apple Magic Keyboard",
                Description = "Este teclado de tamaño completo está repleto de funciones, incluido un mecanismo de tijera para una experiencia de escritura cómoda, Touch ID para un inicio de sesión seguro y un puerto USB-C para cargar. También tiene retroiluminación para usar en entornos con poca luz.",
                PriceInUSD = 99,
                PriceInARS = 81000.99,
                PictureUrl = "images/products/wesley-tingey-FNhyekndnSM-unsplash.jpg",
                Category = "Keyboard",
                Brand = "Apple",
                QuantityInStock = 27
            },
            new Product
            {
                Name = "Logitech MX Master 2S",
                Description = "Este mouse inalámbrico está diseñado para la productividad, con un sensor de alta precisión que rastrea prácticamente cualquier superficie y una ruedecilla que permite un desplazamiento y navegación rápidos. También es recargable mediante USB-C y tiene una batería de larga duración de hasta 70 días con una sola carga.",
                PriceInUSD = 79,
                PriceInARS = 64600.99,
                PictureUrl = "images/products/auguras-pipiras-d62p4lEN4R0-unsplash.jpg",
                Category = "Mouse",
                Brand = "Logitech",
                QuantityInStock = 83
            },
            new Product
            {
                Name = "Logitech G102",
                Description = "Este mouse para juegos está repleto de funciones, que incluyen botones programables, configuraciones de DPI ajustables e iluminación RGB. También es liviano y ergonómico, lo que lo hace cómodo de usar durante largas sesiones de juego.",
                PriceInUSD = 39,
                PriceInARS = 31900.99,
                PictureUrl = "images/products/ryan-putra-j4PqlNVZ4Bc-unsplash.jpg",
                Category = "Mouse",
                Brand = "Logitech",
                QuantityInStock = 46
            },
            new Product
            {
                Name = "Microsoft Arc Mouse 1",
                Description = "Este mouse elegante y compacto está diseñado para ser portátil, con una forma de arco única que hace que sea fácil de guardar en un bolso o bolsillo. También es recargable mediante USB-C y tiene una batería de larga duración de hasta seis meses con una sola carga.",
                PriceInUSD = 49,
                PriceInARS = 40100.99,
                PictureUrl = "images/products/katlyn-luz-JOef0jIIYDM-unsplash.jpg",
                Category = "Mouse",
                Brand = "Microsoft",
                QuantityInStock = 81
            },
            new Product
            {
                Name = "Laptop Dell Windows White",
                Description = "Esta computadora portátil liviana y portátil presenta un elegante diseño blanco y funciona con el sistema operativo Windows 10. Está equipado con un procesador Intel Core i3, 4 GB de RAM y un SSD de 128 GB, lo que lo hace perfecto para tareas cotidianas como navegar por Internet, enviar correos electrónicos y crear documentos.",
                PriceInUSD = 350,
                PriceInARS = 286200.99,
                PictureUrl = "images/products/erick-cerritos-i5UV2HpITYA-unsplash.jpg",
                Category = "Laptop",
                Brand = "Dell",
                QuantityInStock = 62
            },
            new Product
            {
                Name = "Apple Macbook Laptop",
                Description = "Esta computadora portátil delgada y potente está diseñada para brindar rendimiento y portabilidad, con un chip Apple M1 que ofrece velocidades de procesamiento rápidas y una batería de larga duración. También está equipado con una pantalla Retina, seguridad Touch ID y múltiples opciones de conectividad como USB-C y Wi-Fi 6.",
                PriceInUSD = 999,
                PriceInARS = 816900.99,
                PictureUrl = "images/products/maxim-hopman-Hin-rzhOdWs-unsplash.jpg",
                Category = "Laptop",
                Brand = "Apple",
                QuantityInStock = 97
            },
            new Product
            {
                Name = "MacBook Pro",
                Description = "Esta computadora portátil premium de Apple cuenta con un procesador Intel Core i5, 8 GB de RAM y un SSD de 256 GB. También está equipado con una pantalla Retina, funcionalidad Touch Bar y múltiples opciones de conectividad como USB-C y Wi-Fi 6.",
                PriceInUSD = 1299,
                PriceInARS = 1062200.99,
                PictureUrl = "images/products/dillon-shook-xbFX7qCoAqI-unsplash.jpg",
                Category = "Laptop",
                Brand = "Apple",
                QuantityInStock = 93
            },
            new Product
            {
                Name = "iMac Monitor",
                Description = "Esta computadora de escritorio todo en uno de Apple cuenta con un procesador Intel Core i3, 8 GB de RAM y un SSD de 256 GB. También está equipado con una impresionante pantalla Retina, múltiples opciones de conectividad como USB-C y Wi-Fi 6 y parlantes integrados para una experiencia de audio envolvente.",
                PriceInUSD = 1249,
                PriceInARS = 1021300.99,
                PictureUrl = "images/products/invictus-tailoring-sneaker-socks-ljEoJUK8zDE-unsplash.jpg",
                Category = "Monitor",
                Brand = "Apple",
                QuantityInStock = 95
            },
            new Product
            {
                Name = "iMac Monitor",
                Description = "Otra computadora de escritorio todo en uno de Apple con un procesador Intel Core i5, 8 GB de RAM y un SSD de 512 GB. También está equipado con una pantalla Retina, múltiples opciones de conectividad como USB-C y Wi-Fi 6, y parlantes integrados para una experiencia de audio envolvente.",
                PriceInUSD = 1249,
                PriceInARS = 1021300.99,
                PictureUrl = "images/products/quaritsch-photography-m2zuB8DqwyM-unsplash.jpg",
                Category = "Monitor",
                Brand = "Apple",
                QuantityInStock = 28
            },
            new Product
            {
                Name = "Marshall Major III BT Black",
                Description = "Estos auriculares supraaurales de Marshall están diseñados para amantes de la música que desean una calidad de sonido rica y un estilo clásico. Cuentan con conectividad Bluetooth, diademas ajustables y cables desmontables para uso con cable cuando sea necesario.",
                PriceInUSD = 79,
                PriceInARS = 64600.99,
                PictureUrl = "images/products/milena-trifonova-pHqt1DsHCx0-unsplash.jpg",
                Category = "Headphones",
                Brand = "Marshall",
                QuantityInStock = 79
            },
            new Product
            {
                Name = "Headphone JBL minimal",
                Description = "Estos auriculares inalámbricos de JBL están diseñados para brindar comodidad y portabilidad, con un diseño elegante y minimalista que es perfecto para usarlos mientras viaja. Cuentan con conectividad Bluetooth, diademas ajustables y hasta ocho horas de duración de la batería con una sola carga.",
                PriceInUSD = 149,
                PriceInARS = 121800.99,
                PictureUrl = "images/products/kiran-ck-cJ8YB0InG6k-unsplash.jpg",
                Category = "Headphones",
                Brand = "JBL",
                QuantityInStock = 81
            },
            new Product
            {
                Name = "AirPods Pro",
                Description = "Estos verdaderos auriculares inalámbricos de Apple están diseñados para brindar comodidad y conveniencia, con tecnología de cancelación activa de ruido que bloquea el ruido externo para una experiencia de audio envolvente. También cuentan con controles táctiles para una fácil operación y múltiples opciones de conectividad como Bluetooth y Wi-Fi 6.",
                PriceInUSD = 249,
                PriceInARS = 203600.99,
                PictureUrl = "images/products/nidheesh-kavalan-wscuT4NtHXE-unsplash.jpg",
                Category = "Headphones",
                Brand = "Apple",
                QuantityInStock = 34
            },
            new Product
            {
                Name = "Sony Headphones",
                Description = "Estos auriculares supraaurales de Sony están diseñados para audiófilos que exigen una calidad de sonido excepcional. Cuentan con tecnología de cancelación de ruido, diademas ajustables y una batería de larga duración de hasta 30 horas con una sola carga. También vienen con múltiples opciones de conectividad como Bluetooth y un conector de audio con cable.",
                PriceInUSD = 148,
                PriceInARS = 121000.99,
                PictureUrl = "images/products/yearone-oplCWB9A0bI-unsplash.jpg",
                Category = "Headphones",
                Brand = "Sony",
                QuantityInStock = 49
            }   
        };

        foreach (var product in products) 
        {
            context.Products.Add(product);
        }

        context.SaveChanges();
    }
}