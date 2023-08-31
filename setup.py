from setuptools import setup

setup(
    name="ecde-openlayer-app",
    version="0.1.0",
    packages=["src"],
    install_requires=["cdsapi", "xarray", "netcdf4", "geopandas", "flask"],
)