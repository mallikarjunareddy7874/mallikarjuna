from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in training/__init__.py
from training import __version__ as version

setup(
	name="training",
	version=version,
	description="training",
	author="mallikarjuna",
	author_email="mallikarjuna.r@promantia.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
