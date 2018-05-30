import tempfile
from subprocess import call

import requests
from PySide2.QtCore import *
from PySide2.QtGui import *
from PySide2.QtWidgets import *
from mss import mss


class TnyClick(QMainWindow):
    _title = "Tny.Click"
    _screenshot = None

    _check_box = None
    _tray_icon = None
    _text_box = None
    _settings = None

    # Override the class constructor
    def __init__(self):
        self._screenshot = mss()
        # Be sure to call the super class method
        QMainWindow.__init__(self)

        self._settings = QSettings(self._title, "client")

        self.setMinimumSize(QSize(400, 400))
        self.setWindowTitle(self._title)

        central_widget = QWidget(self)
        self.setCentralWidget(central_widget)

        self._text_box = QLineEdit(self)
        self._text_box.textChanged.connect(self.on_text_changed)
        self._check_box = QCheckBox('Minimize to Tray', self)
        self._check_box.clicked.connect(self.on_minimize_checked)

        form_layout = QFormLayout()
        form_layout.addRow("Token", self._text_box)
        form_layout.addRow(self._check_box)

        central_widget.setLayout(form_layout)

        self.restore_settings()
        self.build_tray()

        QShortcut(QKeySequence('Ctrl+Shift+4'), self, self.run)

    def build_tray(self):
        # Init QSystemTrayIcon
        self._tray_icon = QSystemTrayIcon(self)
        self._tray_icon.setIcon(self.style().standardIcon(QStyle.SP_ComputerIcon))

        show_action = QAction("Open " + self._title, self)
        quit_action = QAction("Quit " + self._title, self)
        show_action.triggered.connect(self.show)
        quit_action.triggered.connect(qApp.quit)
        tray_menu = QMenu()
        tray_menu.addAction(show_action)
        tray_menu.addAction(quit_action)
        self._tray_icon.setContextMenu(tray_menu)
        self._tray_icon.show()

    def restore_settings(self):
        self._text_box.setText(self._settings.value("token", ""))
        self._check_box.setChecked(bool(self._settings.value("minimize", False)))

    def on_text_changed(self, text_input):
        self._settings.setValue("token", text_input)

    def on_minimize_checked(self, checked):
        self._settings.setValue("minimize", checked)

    # The window will be closed only if there is no check mark in the check box
    def closeEvent(self, event):
        if self._check_box.isChecked():
            event.ignore()
            self.hide()
            self._tray_icon.showMessage(
                "Tray Program",
                "Application was minimized to Tray",
                QSystemTrayIcon.Information,
                2000
            )

    def run(self):
        if sys.platform.startswith("linux"):
            return self.run_linux()

    def run_linux(self):
        f = tempfile.NamedTemporaryFile(
            suffix='.png', prefix='tnyclick_tmp_')
        tmp_filename = f.name

        command = 'gnome-screenshot -af ' + tmp_filename
        call(command, shell=True)
        self.upload_file(tmp_filename)

    def upload_file(self, tmp_filename):
        token = self._text_box.text()

        url = 'https://tny.click/api/images'
        files = {'file': open(tmp_filename, 'rb')}
        headers = {'Authorization': 'Token ' + token}
        r = requests.post(url, files=files, headers=headers)

        print(r.content)


if __name__ == "__main__":
    import sys

    app = QApplication(sys.argv)
    window = TnyClick()
    window.show()
    sys.exit(app.exec_())
