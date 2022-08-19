import React from "react";
import { Link } from "react-router-dom";
import useForm from "./useForm";
import infoJson from "../../info.json"
import style from "./FormProduct.module.css"
import unaX from "../../Imagenes/unaX.svg"

const initialForm = {
  name: "",
  brand: "",
  category: "",
  price: 0,
  stock: 0,
  image: "",
  sold: 0,
  size: [],
  score: 0,
  genre: ""
}

const validateForm = (form, value) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regExpUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|jpeg|png)/i;

  if (!form.name.trim() && value === "name") {
    errors.name = "El nombre del producto es requerido"
  } else if (!regexName.test(form.name.trim()) && value === "name") {
    errors.name = "El nombre del producto solo acepta letras y espacios."
  };

  if (!form.size.length && value === "size") {
    errors.size = "Debes seleccionar minimo 1 talle"
  }

  if (form.brand === "" && value === "brand") {
    errors.brand = "Debes seleccionar una marca"
  };

  if (form.category === "" && value === "category") {
    errors.category = "Debes seleccionar una categoria"
  };

  if (form.genre === "" && value === "genre") {
    errors.genre = "El producto debe pertener a un genero"
  };

  if (value === "image") {
    if (form.image === "") {
      errors.image = "El producto necesita una imagen"
    }
    // else if (!regExpUrl.test(form.image)) {
    //   errors.image = "La direccion de imagen debe ser en formato jpg, jpeg o png"
    // }
    errors.showImage = "limpio"
  }

  return errors;
}


export default function FormProduct() {
  const {
    form,
    setForm,
    errors,
    showImage,
    setShowImage,
    handleOnChange,
    handleSubmit,
    handleChecked,
    handleOnBlur
  } = useForm(initialForm, validateForm)


  return (
    <div className={style.containerPrincipal}>
      <Link to="/Home" className={style.link}>
        {/* <img src={unaX} alt="" /> */}
        <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
      </Link>
      <h2>Agrega un producto al catalogo</h2>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input type="text"
              name="name"
              id="name"
              value={form.name}
              onBlur={handleOnBlur}
              onChange={handleOnChange} />
            {errors.name && <p className={style.error}>{errors.name}</p>}
          </div>

          <div className={style.catbrand}>
            <label htmlFor="category">Categoria</label>
            <select name="category" onChange={handleOnChange} onBlur={handleOnBlur}>
              <option style={{ display: "none" }} >Category</option>
              <option value="calzado" >Calzado</option>
              <option value="camiseta" >Camiseta</option>
              <option value="pantalon" >Pantalon</option>
              <option value="buzo" >Buzo</option>
              <option value="campera" >Campera</option>
            </select>
            {/* {errors.category && <p className={style.error}>{errors.category}</p>} */}

            <label htmlFor="brand">Marca</label>
            <select name="brand" onChange={handleOnChange} onBlur={handleOnBlur}>
              <option style={{ display: "none" }} >Brand</option>
              <option value="Adidas" >Adidas</option>
              <option value="Nike" >Nike</option>
              <option value="Puma" >Puma</option>
            </select>

            {errors.category && <p className={style.error}>{errors.category}</p>}
            {errors.brand && <p className={style.error}>{errors.brand}</p>}
          </div>

          <div className={style.divImage}>
            <label htmlFor="image">Imagen</label>
            <input type="text"
              name="image"
              id="image"
              value={form.image}
              onBlur={handleOnBlur}
              onChange={handleOnChange} />
            {errors.image && <p className={style.error}>{errors.image}</p>}
          </div>

          {errors.showImage &&
            <div>
              <img src={form.image} alt="Image not found" />
            </div>}

          <div className={style.divPrice}>
            <label htmlFor="price">Precio</label>
            <input type="number"
              name="price"
              id="price"
              value={form.price}
              onBlur={handleOnBlur}
              onChange={handleOnChange} />
          </div>

          <div className={style.stockVendido}>
            <label htmlFor="stock">Disponible</label>
            <input type="number"
              name="stock"
              id="stock"
              min="0"
              value={form.stock}
              onBlur={handleOnBlur}
              onChange={handleOnChange} />

            <label htmlFor="sold">Vendidos</label>
            <input type="number"
              name="sold"
              id="sold"
              min="0"
              value={form.sold}
              onBlur={handleOnBlur}
              onChange={handleOnChange} />
          </div>

          <div className="w-75 mx-auto">
            <h2>Talle/s</h2>
            {form.category === "calzado" ?
              infoJson.hombres.calzado[0].talle.map(
                e => {
                  return (
                    <div key={e} class="form-check-inline">
                      <label class="form-check-label" htmlFor={e}>
                      <input type="checkbox"
                      class="form-check-input"
                        name={e}
                        id={e}
                        value={form.size}
                        onBlur={handleOnBlur}
                        onChange={handleChecked} />
                      {e}
                      </label>

                      {errors.size && <p className={style.error}>{errors.size}</p>}
                    </div>

                  )
                }
              )
              :
              infoJson.hombres.camperas[0].talle.map(
                e => {
                  return (
                    <div key={e} class="form-check-inline">
                      <label class="form-check-label" htmlFor={e}>
                        <input type="checkbox"
                          class="form-check-input"
                          name={e}
                          id={e}
                          value={form.size}
                          onBlur={handleOnBlur}
                          onChange={handleChecked} />
                        {e}
                      </label>

                      {errors.size && <p className={style.error}>{errors.size}</p>}
                    </div>
                  )
                }
              )
            }
          </div>

          <div className={style.calificacion}>
            <label htmlFor="score">Calificacion</label>
            <input type="number"
              name="score"
              min="0"
              max="5"
              step="0.1"
              id="score"
              value={form.score}
              onBlur={handleOnBlur}
              onChange={handleOnChange} />
          </div>

          <div className={style.genre}>
            <label htmlFor="genre">Genero</label>
            <select name="genre" onChange={handleOnChange} onBlur={handleOnBlur}>
              <option style={{ display: "none" }}>Genre</option>
              <option value="hombre" >Hombre</option>
              <option value="mujer" >Mujer</option>
            </select>

            {errors.genre && <p className={style.error}>{errors.genre}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}