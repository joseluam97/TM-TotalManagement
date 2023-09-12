from tm import varGlobal
from tm.models import *
from tm.serializers import *

def getMyMision(idUser):

    vectorMisiones = []
    
    #VER LAS SUBMISIONES EN LAS CUAL ESTE ASIGNADO
    contractuser_var = contractuser.objects.all().filter(user_id = idUser)

    contractUser = list(map(lambda obj: obj.subMision_id.id_mision, contractuser_var))
    vectorMisiones = vectorMisiones + contractUser

    #AÑADIR MISIONES EN LAS QUE ESTA COMO MANAGER O COMO EMPLEADO
    mision_responsables_var = mision.objects.all().filter(responsables=idUser)
    mision_empleados_var = mision.objects.all().filter(empleados=idUser)

    vectorMisiones = vectorMisiones + mision_responsables_var
    vectorMisiones = vectorMisiones + mision_empleados_var
    
    #AÑADIR WORK PACKAGE QUE ESTA AÑADIDO COMO RESPONSABLE
    workPackage_var = workPackage.objects.all().filter(responsableWP = idUser)
    
    for elementoWP in workPackage_var:
        misionByWP = mision.objects.all().filter(id_workPackage = elementoWP.id)
        vectorContract = vectorContract + misionByWP

    vectorMisiones_serializer = misionSerializer(vectorMisiones, many = True)

    return vectorMisiones_serializer


def getMyMisionID(idUser):

    vectorMisiones = []
    
    #VER LAS SUBMISIONES EN LAS CUAL ESTE ASIGNADO
    contractuser_var = contractuser.objects.all().filter(user_id = idUser)

    contractUser = list(map(lambda obj: obj.subMision_id.id_mision.id, contractuser_var))
    vectorMisiones = vectorMisiones + contractUser

    #AÑADIR MISIONES EN LAS QUE ESTA COMO MANAGER O COMO EMPLEADO
    mision_responsables_var = mision.objects.all().filter(responsables=idUser)
    mision_empleados_var = mision.objects.all().filter(empleados=idUser)

    mision_responsables_id = list(map(lambda obj: obj.id, mision_responsables_var))
    mision_empleados_id = list(map(lambda obj: obj.id, mision_empleados_var))

    vectorMisiones = vectorMisiones + mision_responsables_id
    vectorMisiones = vectorMisiones + mision_empleados_id
    
    #AÑADIR WORK PACKAGE QUE ESTA AÑADIDO COMO RESPONSABLE
    workPackage_var = workPackage.objects.all().filter(responsableWP = idUser)
    
    for elementoWP in workPackage_var:
        misionByWP = mision.objects.all().filter(id_workPackage = elementoWP.id)
        misionByWP_listID = list(map(lambda obj: obj.id, misionByWP))
        vectorContract = vectorContract + misionByWP_listID


    return vectorMisiones


def getMySubMision(idUser):

    vectorSubMisiones = []
    
    #VER LAS SUBMISIONES EN LAS CUAL ESTE ASIGNADO
    contractuser_var = contractuser.objects.all().filter(user_id = idUser)

    contractUser = list(map(lambda obj: obj.subMision_id, contractuser_var))
    vectorSubMisiones = vectorSubMisiones + contractUser

    #AÑADIR MISIONES EN LAS QUE ESTA COMO MANAGER O COMO EMPLEADO
    mision_responsables_var = mision.objects.all().filter(responsables=idUser)
    mision_empleados_var = mision.objects.all().filter(empleados=idUser)

    misiones_all = list(mision_responsables_var) + list(mision_empleados_var)

    #AÑADIR WORK PACKAGE QUE ESTA AÑADIDO COMO RESPONSABLE
    workPackage_var = workPackage.objects.all().filter(responsableWP = idUser)
    
    for elementoWP in workPackage_var:
        misionByWP = mision.objects.all().filter(id_workPackage = elementoWP.id)
        misiones_all = list(misiones_all) + list(misionByWP)

    #TRADUCIR MISIONES A SUB MISIONES
    for elementoMision in misiones_all:
        subMisionesByMision = subMision.objects.all().filter(id_mision = elementoMision.id)
        vectorSubMisiones = vectorSubMisiones + subMisionesByMision

    vectorSubMisiones_serializer = subMisionSerializer(vectorSubMisiones, many = True)

    return vectorSubMisiones_serializer


def getMySubMisionID(idUser):

    vectorSubMisiones = []
    
    #VER LAS SUBMISIONES EN LAS CUAL ESTE ASIGNADO
    contractuser_var = contractuser.objects.all().filter(user_id = idUser)

    contractUser = list(map(lambda obj: obj.subMision_id.id, contractuser_var))
    vectorSubMisiones = vectorSubMisiones + contractUser

    #AÑADIR MISIONES EN LAS QUE ESTA COMO MANAGER O COMO EMPLEADO
    mision_responsables_var = mision.objects.all().filter(responsables=idUser)
    mision_empleados_var = mision.objects.all().filter(empleados=idUser)

    misiones_all = list(mision_responsables_var) + list(mision_empleados_var)

    #AÑADIR WORK PACKAGE QUE ESTA AÑADIDO COMO RESPONSABLE
    workPackage_var = workPackage.objects.all().filter(responsableWP = idUser)
    
    for elementoWP in workPackage_var:
        misionByWP = mision.objects.all().filter(id_workPackage = elementoWP.id)
        misiones_all = list(misiones_all) + list(misionByWP)

    #TRADUCIR MISIONES A SUB MISIONES
    for elementoMision in misiones_all:
        subMisionesByMision = subMision.objects.all().filter(id_mision = elementoMision.id)
        subMisionByMision_listID = list(map(lambda obj: obj.id, subMisionesByMision))
        vectorSubMisiones = vectorSubMisiones + subMisionByMision_listID

    return vectorSubMisiones