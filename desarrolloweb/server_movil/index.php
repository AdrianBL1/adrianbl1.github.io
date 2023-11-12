<?php
class servicios {
	private $datos;

	public function __construct($DATA) {
		$respuesta = new stdClass();

		if(array_key_exists("datos", $DATA)) { // Verifico que en el paquete recibido venga el dato: datos
			try { $this->datos = json_decode($DATA["datos"]); } // Recupero datos y convierto a objeto PHP
			catch(Exception $e) { $this->datos = NULL; }; // Falló la conversión de JSON a objeto PHP

			if(!is_null($this->datos)){
				// Verifico que el servicio venga indicado y que sea conocido:
				if(property_exists($this->datos, "servicio") && method_exists($this, $this->datos->servicio)){
					// Verifico que los parámetros sean correctos
					if($this->parametros_ok($this->datos)) {
						$servicio =  $this->datos->servicio;
						// Ejecuto el servicio de forma segura
						try { $respuesta->resultado = $this->$servicio($this->datos); }
						catch(Exception $e) { $respuesta->resultado = "Error de procesamiento";}
					}
					else $respuesta->resultado = "Parámetros incorrectos";
				}
				else $respuesta->resultado = "Servicio desconocido";
			}
			else $respuesta->resultado = "Formato de datos incorrecto";
		}
		else $respuesta->resultado = "Error en los datos";

		echo json_encode($respuesta); // Devuelvo la respuesta al cliente
	}

	// ---------
	// SERVICIOS
	// ---------

	// Realiza una suma de dos valores
	private function SUMAR($datos) {
		return $datos->x + $datos->y;
	}

	// Realiza una resta de dos valores
	private function RESTAR($datos) {
		return $datos->x - $datos->y;
	}

	// Realiza una multiplicacion de dos valores
	private function MULTIPLICAR($datos) {
		return $datos->x * $datos->y;
	}

	// Realiza una division de dos valores
	private function DIVIDIR($datos) {
		return $datos->x / $datos->y;
	}

	// Realiza el modulo de dos valores
	private function MODULAR($datos) {
		return $datos->x % $datos->y;
	}

	// ------------------------
	// VALIDACIÓN DE PARÁMETROS
	// ------------------------

	private function parametros_ok($datos) {
		$servicio = $datos->servicio . "_PARAMETROS";

		if(method_exists($this, $servicio)) {
			$parametros = $this->$servicio(); // Obtengo la descripción de los parámetros
			foreach ($parametros as $parametro => $valor) {
				if(!property_exists($datos, $parametro)) return false; // Verifico el nombre del parámetro
				if(gettype($valor) != gettype($datos->$parametro)) return false; // Verifico el tipo del parámetro
			}
			return true;
		}
		else return false;
	}

		// Reporta el tipo de parámetros a esperar para el servicio SUMA
		private function SUMAR_PARAMETROS() {
			return ["x" => 0, "y" => 0];
		}

		// Reporta el tipo de parámetros a esperar para el servicio RESTA
		private function RESTAR_PARAMETROS() {
			return ["x" => 0, "y" => 0];
		}

		// Reporta el tipo de parámetros a esperar para el servicio MULTIPLICACION
		private function MULTIPLICAR_PARAMETROS() {
			return ["x" => 0, "y" => 0];
		}

		// Reporta el tipo de parámetros a esperar para el servicio DIVISION
		private function DIVIDIR_PARAMETROS() {
			return ["x" => 0, "y" => 0];
		}

		// Reporta el tipo de parámetros a esperar para el servicio MODULO
		private function MODULAR_PARAMETROS() {
			return ["x" => 0, "y" => 0];
		}
}
if(count($_POST)) new servicios($_POST);
else {
	$handle = fopen('php://input','r');
	$POST = fgets($handle);
	new servicios(["datos" => $POST]);
}
?>