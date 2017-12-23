/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvManagementSystemTestModule } from '../../../test.module';
import { BannerSizeDialogComponent } from '../../../../../../main/webapp/app/entities/banner-size/banner-size-dialog.component';
import { BannerSizeService } from '../../../../../../main/webapp/app/entities/banner-size/banner-size.service';
import { BannerSize } from '../../../../../../main/webapp/app/entities/banner-size/banner-size.model';

describe('Component Tests', () => {

    describe('BannerSize Management Dialog Component', () => {
        let comp: BannerSizeDialogComponent;
        let fixture: ComponentFixture<BannerSizeDialogComponent>;
        let service: BannerSizeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvManagementSystemTestModule],
                declarations: [BannerSizeDialogComponent],
                providers: [
                    BannerSizeService
                ]
            })
            .overrideTemplate(BannerSizeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BannerSizeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BannerSizeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerSize(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bannerSize = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerSizeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BannerSize();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bannerSize = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bannerSizeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
