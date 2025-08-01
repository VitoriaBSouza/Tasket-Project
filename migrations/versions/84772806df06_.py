"""empty message

Revision ID: 84772806df06
Revises: c4c2f0bbad8c
Create Date: 2025-07-24 20:13:53.871442

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '84772806df06'
down_revision = 'c4c2f0bbad8c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('comment', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.drop_column('comment')

    # ### end Alembic commands ###
