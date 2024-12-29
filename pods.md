# Pods

### Aplicar manifiesto

```
kubectl apply -f <nombre archivo>
```

### Eliminar manifiesto

```
kubectl delete -f <nombre archivo>
```

### Listar recursos

```
kubectl api-resources
```

### Listar pods

```
kubectl get pods
kubectl get po
```

### Eliminar pods

```
kubectl delete pod <nombre pod>
kubectl delete po <nombre pod>
```

### Describir un pod

```
kubectl describe po <nombre del pod>
```

### Port forward

```
kubectl port-forward <nombre pod> <port host>:<port container>
```
