from pymongo.collection import Collection


def individual_patient(patient):
    return {
        "id": str(patient["_id"]),
        "name": patient["name"],
        "key": patient["key"],
        "image": patient["image"],
    }


def list_patients(patients):
    return [individual_patient(patient) for patient in patients]
