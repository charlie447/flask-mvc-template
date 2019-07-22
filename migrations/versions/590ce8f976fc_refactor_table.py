"""refactor table

Revision ID: 590ce8f976fc
Revises: 
Create Date: 2019-07-11 13:36:55.796793

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '590ce8f976fc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_activities',
    sa.Column('_id', sa.Integer(), nullable=False),
    sa.Column('_filename', sa.Text(), nullable=True),
    sa.Column('_upload', sa.Text(), nullable=True),
    sa.Column('_timestamp', sa.DateTime(), nullable=True),
    sa.Column('_type', sa.String(length=10), nullable=False),
    sa.PrimaryKeyConstraint('_id')
    )
    op.create_index(op.f('ix_user_activities__timestamp'), 'user_activities', ['_timestamp'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_activities__timestamp'), table_name='user_activities')
    op.drop_table('user_activities')
    # ### end Alembic commands ###
