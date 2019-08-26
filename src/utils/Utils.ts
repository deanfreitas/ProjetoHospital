class Utils {

    public static removeAttributes(object: any) {

        object.forEach((item, index) => {
            delete item._id;
            delete item.paciente._id;
            delete item.medico._id;
            item.enfermeiros.forEach((itemEnfermeiros, indexEnfermeiros) => {
                delete itemEnfermeiros._id;
            });
        });

        return object;
    }
}

export default Utils;
