/*************************UTILIZANDO FILTER Y MAP (EN DOM Y UP) */

  function opcionesListaRev() {
    var items = [];    
    rmRegistrosList.filter(registro => registro.id == filaSeleccionadaRmRegistro).map(filtered =>
      {
        items.push(<MenuItem value="all">All</MenuItem>)

        for (var i = 1; i <= filtered.rev; i++) {
            // note: we are adding a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            items.push(<MenuItem value={i}>{i}</MenuItem>)
        }
      
     } 

   )
   return items



/* DESDE EL DOM LO LLAMAMOS */

{opcionesListaRev()} 



/* *************************** FILTER Y MAP TODO EN EL DOM */


{/* Si ha filtrado por alguna revisión */}

    {rmAccionesListAPI.filter(registro => registro.rev == revFiltro || revFiltro == "all").map((elemento) =>
        <>
    
        <Button style={{ pointerEvents: elemento.completed ? 'none' : 'auto' }} onClick = {() => dispatch(updateRmAccionAction(elemento.id, '{"completed":true}'))}>
            <TaskAlt style={{color: colorDinamic(elemento.completed)}}  />
        </Button>

        <span value={elemento.id} style={{ cursor: 'pointer'}}  onClick = {() => dispatch(cambiarEstadoRmTasksAction('filaSeleccionada', elemento.id))}> {elemento.proposal} </span>
            <Divider />
        </>
    
    )}


/******************************FILTER Y MAP PARA OPCIONES DINÁMICAS DE SELECT */


function opcionesListaRev() {
  var items = [];    
  rmRegistrosList.filter(registro => registro.id == filaSeleccionadaRmRegistro).map(filtered =>
    {
    
      for (var i = 1; i <= filtered.rev; i++) {
          // note: we are adding a key prop here to allow react to uniquely identify each
          // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
          items.push(<MenuItem value={i}>{i}</MenuItem>)
      }
    
   } 

 )
 
 return items

}

/*************** UTILIZAR SOLO FILTER DEBIDO A VALOR ÚNICO */

let rmActual = rmRegistrosList.filter(registro => registro.id == filaSeleccionadaRmRegistro)[0]



/************* EN MISMA LINEA DEL DOM HACER COMPARACIONES */

{completadaActual ? 'MARK AS INCOMPLETE' : 'MARK AS COMPLETE'}