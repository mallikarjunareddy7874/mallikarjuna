from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate
import json


def execute(filters=None):
    priority_map = {"High": 3, "Medium": 2, "Low": 1}

    filters = filters or frappe._dict({"status": "Open"})

    todo_list = frappe.get_list(
        "ToDo",
        fields=[
            "name",
            "date",
            "description",
            "priority",
            "reference_type",
            "reference_name",
            "assigned_by",
            "owner",
        ],
        filters=filters,
    )

    todo_list.sort(
        key=lambda todo: (
            priority_map.get(todo.priority, 0),
            todo.date and getdate(todo.date) or getdate("1900-01-01"),
        ),
        reverse=True,
    )

    columns = [
        dict(
            label=_("Assigned To/Owner"),
            fieldname="owner",
            width=120,
            fieldtype="Link",
            options="User",
            frozen=True,
        ),
        dict(
            label=_("ID"), fieldname="name", width=120, fieldtype="Link", options="ToDO"
        ),
        dict(label=_("Priority"), fieldname="priority", width=120, fieldtype="Data"),
        dict(label=_("Date"), fieldname="date", width=120, fieldtype="Date"),
        dict(
            label=_("Description"), fieldname="description", width=120, fieldtype="Html",frozen=True ),
        dict(
            label=_("Assigned By"),
            fieldname="assigned_by",
            width=120,
            fieldtype="Link",
            options="User",
        ),
        dict(label=_("Reference"), fieldname="reference", width=420, fieldtype="Html"),
    ]

    for todo in todo_list:
        if todo.owner == frappe.session.user or todo.assigned_by == frappe.session.user:
            if todo.reference_type:
                todo.reference = """<a href="#Form/%s/%s">%s: %s</a>""" % (
                    todo.reference_type,
                    todo.reference_name,
                    todo.reference_type,
                    todo.reference_name,
                )
            else:
                todo.reference = None

    return columns, todo_list
