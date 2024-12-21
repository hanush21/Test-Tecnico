import React from 'react'

const AddProduct = () => {
  return (
    <>
                    <h2>Agregar Producto</h2>
                    <FormField
                        type="text"
                        placeholder="Buscar cliente..."
                        value={searchClient}
                        onChange={(e) => setSearchClient(e.target.value)}
                    />
                    <SelectField
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                    >
                        <option value="">Selecciona un cliente</option>
                        {filteredClients.map((client) => (
                            <option key={client.customerId} value={client.customerId}>
                                {client.givenName} {client.familyName1}
                            </option>
                        ))}
                    </SelectField>
                    <FormField
                        type="text"
                        name="productName"
                        placeholder="Nombre del Producto"
                        value={productData.productName}
                        onChange={handleProductChange}
                        required
                    />
                    <SelectField
                        name="productTypeName"
                        value={productData.productTypeName}
                        onChange={handleProductChange}
                    >
                        <option value="">Seleccione tipo</option>
                        <option value="ftth">Fibra</option>
                        <option value="4G">Móvil</option>
                    </SelectField>
                    <FormField
                        type="number"
                        name="mbSpeed"
                        placeholder="Velocidad en MB"
                        value={productData.mbSpeed}
                        onChange={handleProductChange}
                    />
                    <FormField
                        type="number"
                        name="gbData"
                        placeholder="Datos en GB"
                        value={productData.gbData}
                        onChange={handleProductChange}
                    />
                    <FormField
                        type="text"
                        name="numeracioTerminal"
                        placeholder="Número de Terminal"
                        value={productData.numeracioTerminal}
                        onChange={handleProductChange}
                    />
                    <FormField
                        type="date"
                        name="soldAt"
                        placeholder="Fecha de Venta"
                        value={productData.soldAt}
                        onChange={handleProductChange}
                        required
                    />
                    <SubmitButton onClick={handleSubmitProduct}>
                        Agregar Producto
                    </SubmitButton>
                </>
)
}

export default AddProduct
