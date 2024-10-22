// Estructuración de informción sobre productos
function showCustomAlert(alertas) {
    const product = products[alertas];
    document.getElementById('alertTitle').textContent = product.title;
    document.getElementById('alertImage').src = product.imageSrc;
    document.getElementById('alertImage').alt = product.title;
    document.getElementById('alertPrice').textContent = product.price;
    document.getElementById('alertDescription').textContent = product.description;

    document.getElementById('customAlert').style.display = 'block';
    document.getElementById('customAlertOverlay').style.display = 'block';
}
function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
    document.getElementById('customAlertOverlay').style.display = 'none';
}
const products = [
    {
        title: "Plátano Maduro Chips",
        imageSrc: "insumos/Plátano Maduro Chips.png",
        price: "$ 8.500,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
        
    },
    {
        title: "Manzana Chips",
        imageSrc: "insumos/Manzana Chips.png",
        price: "$ 8.500,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Coliflor y Queso Chips",
        imageSrc: "insumos/Coliflor y Queso Chips.png",
        price: "$ 8.500,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Pan de sagú tajado",
        imageSrc: "insumos/Pan de sagu tajado.png",
        price: "$ 15.000,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Pan de Sagú hamburguesa",
        imageSrc: "insumos/Pan de Sagú tipo Hamburguesa.png",
        price: "$ 14.000,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Pan de sagú perro",
        imageSrc: "insumos/Pan de sagú tipo Perro.png",
        price: "$ 14.000,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Harina de Arroz Integral",
        imageSrc: "insumos/Harina-de-Arroz-Integral.png",
        price: "$ 15.000,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Harina de Garbanzo",
        imageSrc: "insumos/Harina-de-Garbanzo.png",
        price: "$ 15.000,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Harina de Avena",
        imageSrc: "insumos/harina_de_avena_karavansay.webp",
        price: "$ 15.000,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Bebida de almendras",
        imageSrc: "insumos/Bebida_Almendras.png",
        price: "$ 18.500,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Bebida de coco",
        imageSrc: "insumos/Bebida_Coco.png",
        price: "$ 18.500,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Bebida de soya",
        imageSrc: "insumos/Bebida_Soya.png",
        price: "$ 18.500,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Pasta de Quinoa",
        imageSrc: "insumos/Pasta de Quinoa Fusilli.png",
        price: "$ 8.500,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Pasta de Maíz",
        imageSrc: "insumos/Pasta de Maíz Fusillii.png",
        price: "$ 6.500,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    },
    {
        title: "Pasta de Arroz",
        imageSrc: "insumos/Pasta de Arroz Penne.png",
        price: "$ 6.500,00",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum delectus sequi rerum beatae qui, mollitia, quo eos ad quaerat nisi suscipit iste? Inventore nisi ad ipsa velit vitae rerum doloribus."
    }
];