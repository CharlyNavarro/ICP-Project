import Array "mo:base/Array";

actor Cenaduria_Tere {
  
  
  
  type Reservacion = {
    numero: Nat;
    nombre: Text; 
    asientos: Nat;
    mesas: Nat;
  };

  var reservs: [Reservacion] = [
    {
      numero = 1;
      nombre = "Erik";
      asientos = 5;
      mesas = 1;
    }
  ];


  //Agregar reservación
  public func addReserv (nombre: Text, asientos: Nat, mesas: Nat, ) :async Text {
    let nuevoNum = Array.size(reservs) +1;
    let nuevaReserv = {
      numero = nuevoNum;
      nombre = nombre;
      asientos = asientos;
      mesas = mesas;
    };

    reservs := Array.append <Reservacion> (reservs, [nuevaReserv]);

    return "La reservación ha sido exitosa."
  };

  //Mostrar todas las reservaciones. 
  public func listaReserv() : async [Reservacion] {
    return reservs;
  };

  //Obtener fecha por nombre del reservador. 
  public func getReservByNombre (nombre: Text) :async ?Reservacion {
    return Array.find<Reservacion>(reservs, func(rsv) {rsv.nombre == nombre});
  };

  //Actualizar reservaciones (Por favor papa dio que se termine rapido )
  public func actualizarReservacion (numero: Nat, nombre: Text, asientos:Nat, mesas:Nat) : async Text {
    let reservacionActualizar = Array.find <Reservacion> (reservs, func(rsv) {rsv.nombre == nombre});

    switch(reservacionActualizar) {
      case(null) { return "El comensal no está en la lista de reservación." };
      case(?reservacionActualizar) { 
        let reservacionActualizada = {
          numero = numero;
          nombre = nombre;
          asientos = asientos;
          mesas = mesas;
        };

        reservs := Array.map <Reservacion, Reservacion> (reservs, func(r){ if (r.nombre == nombre){reservacionActualizada} else { r } });
        return "La reservación de " # nombre # " ha sido actualizada.";

       };
    };
  };

  //Cancelar reservacion
  public func cancelarReservacion (nombre: Text) :async Text {
    let reservacion = Array.find <Reservacion> (reservs, func(rsv) {rsv.nombre == nombre});
    if (reservacion != null) {
      reservs := Array.filter <Reservacion> (reservs, func(rsv) {rsv.nombre != nombre});
      return "La reservación ha sido cancelada con éxito";
    } else {
      return "Hubo un error. Intentelo más tarde.";
    };
  };
};
