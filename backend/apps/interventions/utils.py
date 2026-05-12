"""
Génération PDF — Rapport par Technicien
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from io import BytesIO
from django.utils import timezone
import os


# ── Enregistrement polices UTF-8 (Windows) ────────────────────────────────────
def _register_fonts():
    try:
        pdfmetrics.registerFont(TTFont('Arial', 'C:/Windows/Fonts/arial.ttf'))
        pdfmetrics.registerFont(TTFont('Arial-Bold', 'C:/Windows/Fonts/arialbd.ttf'))
        pdfmetrics.registerFont(TTFont('Arial-Italic', 'C:/Windows/Fonts/ariali.ttf'))
    except Exception:
        pass

_register_fonts()


def generer_rapport_technicien(technicien, interventions):
    """
    Génère un PDF de rapport pour un technicien donné.
    Retourne un objet BytesIO contenant le PDF.
    """
    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm,
        title=f"Rapport Technicien — {technicien.full_name}",
    )

    styles = getSampleStyleSheet()
    elements = []

    # ── Couleurs ──────────────────────────────────────────────────────────────
    VERT = colors.HexColor("#2C7A3A")
    DARK = colors.HexColor("#1A1A2E")
    GRIS = colors.HexColor("#F4F6F8")
    BLANC = colors.white

    # ── Styles ────────────────────────────────────────────────────────────────
    style_titre = ParagraphStyle(
        'Titre', parent=styles['Title'],
        fontSize=22, textColor=DARK,
        spaceAfter=4, fontName='Arial-Bold'
    )
    style_sous_titre = ParagraphStyle(
        'SousTitre', parent=styles['Normal'],
        fontSize=12, textColor=VERT,
        spaceAfter=2, fontName='Arial-Bold'
    )
    style_normal = ParagraphStyle(
        'Normal2', parent=styles['Normal'],
        fontSize=10, textColor=colors.HexColor("#333333"),
        fontName='Arial', spaceAfter=4
    )
    style_centre = ParagraphStyle(
        'Centre', parent=styles['Normal'],
        fontSize=10, alignment=TA_CENTER,
        fontName='Arial',
        textColor=colors.HexColor("#555555")
    )

    # ── En-tête ───────────────────────────────────────────────────────────────
    elements.append(Paragraph("SMART FARMING", style_sous_titre))
    elements.append(Paragraph(
        f"Rapport d'Interventions — {technicien.full_name}",
        style_titre
    ))
    elements.append(HRFlowable(
        width="100%", thickness=2,
        color=VERT, spaceAfter=12
    ))

    # ── Infos technicien ──────────────────────────────────────────────────────
    elements.append(Paragraph("Informations du Technicien", style_sous_titre))
    elements.append(Spacer(1, 6))

    info_data = [
        ["Nom complet", technicien.full_name],
        ["Email", technicien.email],
        ["Rôle", technicien.get_role_display()],
        ["Date du rapport", timezone.now().strftime("%d/%m/%Y à %H:%M")],
    ]

    info_table = Table(info_data, colWidths=[5*cm, 12*cm])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), GRIS),
        ('TEXTCOLOR', (0, 0), (0, -1), VERT),
        ('FONTNAME', (0, 0), (0, -1), 'Arial-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Arial'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('PADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#DDDDDD")),
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [GRIS, BLANC]),
    ]))
    elements.append(info_table)
    elements.append(Spacer(1, 16))

    # ── Statistiques ──────────────────────────────────────────────────────────
    elements.append(Paragraph("Résumé des Interventions", style_sous_titre))
    elements.append(Spacer(1, 6))

    total = interventions.count()
    terminees = interventions.filter(statut='TERMINE').count()
    en_cours = interventions.filter(statut='EN_COURS').count()
    a_faire = interventions.filter(statut='A_FAIRE').count()
    annulees = interventions.filter(statut='ANNULE').count()

    stats_data = [
        ["Total", "Terminées", "En cours", "À faire", "Annulées"],
        [str(total), str(terminees), str(en_cours), str(a_faire), str(annulees)],
    ]

    stats_table = Table(stats_data, colWidths=[3.4*cm]*5)
    stats_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), BLANC),
        ('FONTNAME', (0, 0), (-1, 0), 'Arial-Bold'),
        ('FONTNAME', (0, 1), (-1, 1), 'Arial-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('PADDING', (0, 0), (-1, -1), 10),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#DDDDDD")),
        ('BACKGROUND', (0, 1), (0, 1), colors.HexColor("#E8F5E9")),
        ('TEXTCOLOR', (0, 1), (0, 1), VERT),
        ('BACKGROUND', (1, 1), (1, 1), colors.HexColor("#E8F5E9")),
        ('TEXTCOLOR', (1, 1), (1, 1), VERT),
    ]))
    elements.append(stats_table)
    elements.append(Spacer(1, 20))

    # ── Liste des interventions ───────────────────────────────────────────────
    elements.append(Paragraph("Détail des Interventions", style_sous_titre))
    elements.append(Spacer(1, 6))

    if not interventions.exists():
        elements.append(Paragraph(
            "Aucune intervention enregistrée pour ce technicien.",
            style_normal
        ))
    else:
        interv_data = [["#", "Type", "Parcelle", "Date planifiée", "Statut"]]

        STATUT_COLORS = {
            'TERMINE': colors.HexColor("#2C7A3A"),
            'EN_COURS': colors.HexColor("#1565C0"),
            'A_FAIRE': colors.HexColor("#E67E00"),
            'ANNULE': colors.HexColor("#C62828"),
        }

        for i, interv in enumerate(interventions.order_by('-date_planifiee'), 1):
            date_str = interv.date_planifiee.strftime("%d/%m/%Y") if interv.date_planifiee else "-"
            interv_data.append([
                str(i),
                interv.get_type_display(),
                interv.parcelle.nom if interv.parcelle else "-",
                date_str,
                interv.get_statut_display(),
            ])

        interv_table = Table(
            interv_data,
            colWidths=[1*cm, 4*cm, 4.5*cm, 4*cm, 3.5*cm]
        )

        table_style = [
            ('BACKGROUND', (0, 0), (-1, 0), DARK),
            ('TEXTCOLOR', (0, 0), (-1, 0), BLANC),
            ('FONTNAME', (0, 0), (-1, 0), 'Arial-Bold'),
            ('FONTNAME', (0, 1), (-1, -1), 'Arial'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('PADDING', (0, 0), (-1, -1), 7),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#DDDDDD")),
            ('ROWBACKGROUNDS', (1, 0), (-1, -1), [GRIS, BLANC]),
        ]

        for i, interv in enumerate(interventions.order_by('-date_planifiee'), 1):
            color = STATUT_COLORS.get(interv.statut, colors.black)
            table_style.append(('TEXTCOLOR', (4, i), (4, i), color))
            table_style.append(('FONTNAME', (4, i), (4, i), 'Arial-Bold'))

        interv_table.setStyle(TableStyle(table_style))
        elements.append(interv_table)
        elements.append(Spacer(1, 20))

        # ── Comptes-rendus ────────────────────────────────────────────────────
        terminees_avec_cr = interventions.filter(
            statut='TERMINE'
        ).exclude(compte_rendu__isnull=True).exclude(compte_rendu__exact='')

        if terminees_avec_cr.exists():
            elements.append(Paragraph(
                "Comptes-Rendus des Interventions Terminées",
                style_sous_titre
            ))
            elements.append(Spacer(1, 6))

            for interv in terminees_avec_cr:
                elements.append(Paragraph(
                    f"Intervention #{interv.id} — {interv.get_type_display()} — {interv.parcelle.nom}",
                    ParagraphStyle('CR_titre', parent=styles['Normal'],
                                   fontSize=10, fontName='Arial-Bold',
                                   textColor=VERT, spaceAfter=2)
                ))
                date_eff = interv.date_effective.strftime("%d/%m/%Y") if interv.date_effective else "N/A"
                elements.append(Paragraph(
                    f"Date effective : {date_eff}",
                    ParagraphStyle('CR_date', parent=styles['Normal'],
                                   fontSize=9, fontName='Arial-Italic',
                                   textColor=colors.gray, spaceAfter=2)
                ))
                elements.append(Paragraph(
                    interv.compte_rendu,
                    ParagraphStyle('CR_text', parent=styles['Normal'],
                                   fontSize=10, fontName='Arial',
                                   leftIndent=12,
                                   textColor=colors.HexColor("#333333"), spaceAfter=8)
                ))
                elements.append(HRFlowable(
                    width="100%", thickness=0.5,
                    color=colors.HexColor("#DDDDDD"), spaceAfter=8
                ))

    # ── Pied de page ──────────────────────────────────────────────────────────
    elements.append(Spacer(1, 20))
    elements.append(HRFlowable(width="100%", thickness=1, color=VERT))
    elements.append(Spacer(1, 6))
    elements.append(Paragraph(
        f"Smart Farming — Rapport généré le {timezone.now().strftime('%d/%m/%Y à %H:%M')}",
        style_centre
    ))

    doc.build(elements)
    buffer.seek(0)
    return buffer