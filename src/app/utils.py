def recursive_update(d, u, ignore_None=False):
    for k, v in u.items():
        if isinstance(v, dict):
            r = recursive_update(d.get(k, {}), v)
            d[k] = r
        else:
            if (not ignore_None) or (u[k] is not None):
                d[k] = u[k]
    return d
