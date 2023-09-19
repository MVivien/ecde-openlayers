## Setup

After cloning the repository `cd` into the `ecde-openlayers` folder.

To install the python related dependencies run:

    pip install -e .
    pip -r requirements.txt

To launch the back-end flask server un:

    flask --app src/server run

To install the front end related dependencies:

    npm install

To launch the app run.

    npm start

If you want to generate the static pages in the `dist` folder:

    npm run build


